import bent from 'bent';
const weeklyDays = 7;

export let dataSet = {
    countries: ["My Country", "My State", "My County", "Selected Location"],
    justCountries: ["My Country"],
    justCounties: [ "My County"],
    justStates: ["My State"],
}

export const flu= 149 // Based on mortality rate of the flu;
export const deathSeverityThresholds = [0, 1, Math.round(flu / 8), Math.round(flu / 4), flu];
export const casesSeverityThresholds = [0, 50, 1000, 2000, 4000];
let importState = 'none';
export const importJHUData = async ({manageStartupSequence}) => {
    let file;

    switch (importState) {

        case "none":
            try {
                importState = "loading";
                file = await readJSFile("jhu");
            } catch (e) {
                console.log("error loading data" + e + e.stack);
                importState = "error";
                return importState
            };
            importState = processJHUFile(file);
            manageStartupSequence();
            return importState

        default:
            return importState;
    }

}

async function readJSFile(filePrefix) {
    const location = window.location;
    let url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = location.protocol + "//" + location.host + "/" + filePrefix + "_test.js";
    } else {
        //url = process.env.PUBLIC_URL + "/" + filePrefix + ".csv";
        url = location.protocol + "//" +location.host + "/" + filePrefix + ".js";
    }
    console.log(url);
    const getBuffer = bent('string');
    return await getBuffer(url);
    //console.log(csvFiles[filePrefix]);
}

function processJHUFile(file) {
    const json = JSON.parse(file.substr(file.indexOf("{")));

    dataSet.country = json.data;
    dataSet.dates = json.dates;
    const fromDate = dataSet.dates[0];
    const toDate = dataSet.dates[dataSet.dates.length - 1];
    dataSet.dateRange = {
        first: fromDate,
        last: toDate,
        from: new Date("20" + fromDate.split("/")[2], fromDate.split("/")[0]-1,  fromDate.split("/")[1]).getTime(),
        to: new Date("20" + toDate.split("/")[2], toDate.split("/")[0]-1,  toDate.split("/")[1]).getTime(),
    }

    // https://www.cdc.gov/nchs/products/databriefs/db355.htm
    dataSet.benchmarks = {
        mortality: ["USA - Overall Mortality", 7236],
        heartDisease: ["USA - Heart Desease", 1636],
        cancer: ["USA - Cancer", 1491],
        flu: ["USA - Flu & Pneumonia", 149]
    }
    processJHUCountries(dataSet);
    dataSet.codes = {};
    Object.getOwnPropertyNames(dataSet.country)
        .map(c => {dataSet.countries.push(c);dataSet.codes[dataSet.country[c].code] = dataSet.country[c]});
    Object.getOwnPropertyNames(dataSet.country)
        .filter(c => c === "My Country" || dataSet.country[c].type === 'country')
        .map(c => dataSet.justCountries.push(c));
    Object.getOwnPropertyNames(dataSet.country)
        .filter(c=>c === "My County" || dataSet.country[c].type === 'county')
        .map(c => dataSet.justCounties.push(c));
    Object.getOwnPropertyNames(dataSet.country)
        .filter(c=>c === "My State" || dataSet.country[c].type === 'state' || dataSet.country[c].type === 'province')
        .map(c => dataSet.justStates.push(c));
    dataSet.justCounties.map(c => {
        const state = dataSet.country[c.replace(/(.*), /, '')];
        if (state)
            state.counties.push(c)
    });
    dataSet.justStates.map(c => {
        const country = dataSet.country[c] && dataSet.codes[dataSet.country[c].code];
        if (country)
            country.states.push(c);
    });
    console.log(`${dataSet.justCountries.length} countries`);
    console.log(`${dataSet.justStates.length} states`);
    console.log(`${dataSet.justCounties.length} counties`);
    let status = "loaded";
    return status;
}
function expand(data, size) {
    for (const p in data)
        if (data[p] instanceof Array)
            data[p] = [...(new Array(size - data[p].length)).fill(0), ...data[p]];
    return data;
}
function processJHUCountries (dataSet) {
    dataSet.country["The Whole World"] = dataSet.country["Total"];
    delete dataSet.country["Total"];
    const time = new Date();
    for (let countryName in  dataSet.country) {
        const country = expand(dataSet.country[countryName], dataSet.dates.length);
        const countryTests = country.tests ? country.tests : (new Array(country.cases.length)).fill(0);
        const countryVaccinations = country.vaccinations ? country.vaccinations : (new Array(country.cases.length)).fill(0);

        const cases = country.cases[country.cases.length - 1];
        const deaths = country.deaths[country.deaths.length - 1];
        const tests = countryTests[countryTests.length - 1];
        const vaccinations = countryVaccinations[countryVaccinations.length - 1];

        const casePerPopulationSeries = country.cases.map( c => c * 1000000 / country.population);
        const deathPerPopulationSeries = country.deaths.map( c => c * 1000000 / country.population);
        //const testPerPopulationSeries = country.tests.map( c => c * 1000000 / country.population);

        const newCaseSeries = country.cases.map((c, ix) => ix === 0 ? 0 : c - country.cases[ix -1]);
        const newDeathSeries = country.deaths.map((c, ix) => ix === 0 ? 0 : c - country.deaths[ix -1]);
        const newTestSeries = countryTests.map((c, ix) => ix === 0 ? 0 : c - countryTests[ix -1] * 1);
        const newVaccinationsSeries = countryVaccinations.map((c, ix) => ix === 0 ? 0 : c - countryVaccinations[ix -1] * 1);

        const mortalitySeveritySeries = deathPerPopulationSeries.map(deathsPerM => (
        deathSeverityThresholds.reduce((accum, threshold, ix) => (
            deathsPerM >= threshold ? ix : accum), 0)));

        const caseSeveritySeries = casePerPopulationSeries.map(deathsPerM => (
            casesSeverityThresholds.reduce((accum, threshold, ix) => (
                deathsPerM >= threshold ? ix : accum), 0)));


            dataSet.country[countryName] = {
            name: countryName,
            type: country.type,
            code: country.code,
            population: country.population,
            states: [],
            counties: [],
            mortalitySeverityOverTime: mortalitySeveritySeries,
            caseSeverityOverTime: caseSeveritySeries,
            casesOverTime: country.cases,
            deathsOverTime: country.deaths,
            newCasesOverTime: newCaseSeries,
            newDeathsOverTime: newDeathSeries,
            testsOverTime: countryTests,
            newTestsOverTime: newTestSeries,
            vaccinationsOverTime: country.vaccinations || [],
            newVaccinationsOverTime: newVaccinationsSeries

        };
    };
    console.log("Preprocessing took " + ((new Date()).getTime() - time.getTime()));
}
dataSet.getDataPoint = (cdata, date, dataPoint, byWeek) => {
    dataPoint = dataPoint.replace(/PerM/, "PerPopulation"); // Temp hack until schema fixed
    let dataPoints;
    if (byWeek && (dataPoint.match(/new/i) || dataPoint.match(/expected/i))) {
        dataPoints = dataSet.getDataPoints(cdata, date - (6 * 24 * 1000 * 60 * 60),
            date, dataPoint.replace(/PerM/, "PerPopulation"));
        if(dataPoints[0] instanceof Array)
            return dataPoints[0].reduce((a, v, i) => a + v + dataPoints[1][i], 0);
        else
            return dataPoints.reduce((a, v) => a + v);
    } else {
        dataPoints = dataSet.getDataPoints(cdata, date, date, dataPoint);
        if(dataPoints[0] instanceof Array)
            return dataPoints[0][0] + dataPoints[1][0];
        else
            return dataPoints[0]
    }
}
export const dateToIx = (date) => {
    return Math.min(dataSet.dates.length - 1, Math.max(0, Math.round((date - dataSet.dateRange.from) / (24 * 60 * 60 * 1000))))
}
dataSet.getDataPoints = (cdata, from, to, dataPoint, granularity, dimensions) => {
    dataPoint = dataPoint.replace(/OverTime/, '');
    //console.log(`dataSet.getDataPoints ${dataPoint}`);
    const d1 = dateToIx(from);
    let d2 =  dateToIx(to) + 1;
    switch (dataPoint) {

        case 'deaths':
            return structureData([cdata.deathsOverTime.slice(d1, d2)], last);

        case 'cases':
            return structureData([cdata.casesOverTime.slice(d1, d2)], last);

        case 'tests':
            return structureData([cdata.testsOverTime.slice(d1, d2)], last);

        case 'vaccinations':
            return structureData([cdata.vaccinationsOverTime.slice(d1, d2)], last);

        case 'daysToHerd':
            const lastChangeDay = getLastChanged(cdata.newVaccinationsOverTime);
            const ave = movingAverage(cdata.newVaccinationsOverTime, 7).slice(lastChangeDay, lastChangeDay + 1);
            return structureData([cdata.vaccinationsOverTime.slice(d1, d2)],
                (data, na, ix) => ave[ix] ? ((cdata.population * 0.7 - data[0]) / ave[ix]) / 7: NaN);

        case 'positiveRatio':
            if (granularity === 'weekly')
                d2 -= 7;
            return  structureData([cdata.newCasesOverTime.slice(d1, d2), cdata.newTestsOverTime.slice(d1, d2)],
                data => Math.min(1, data[1] > 0 ? data[0] / data[1] : 0));

        case 'casePerTest':
            return stacked([cdata.casesOverTime.slice(d1, d2), cdata.testsOverTime.slice(d1, d2)], sum);

        case 'deathsPerPopulation':
            return structureData([cdata.deathsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], last);

        case 'casesPerPopulation':
            return structureData([cdata.casesOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], last);

        case 'testsPerPopulation':
            return structureData([cdata.testsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], last);

        case 'vaccinationsPerPopulation':
            return structureData([cdata.vaccinationsOverTime.slice(d1, d2).map(d => d  / cdata.population)], last);

        case 'casePerTestPerPopulation':
            return stacked([cdata.casesOverTime.slice(d1, d2).map(d => d / cdata.population),
                           cdata.testsOverTime.slice(d1, d2).map(d => d / cdata.population)], last);

        case 'deathsAsPercentOfFlu':
            return structureData([cdata.deathsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population / 171)], last);

        case 'deathsAsPercentOfOverall':
            return structureData([cdata.deathsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population / 8657)], last);

        case 'newDeaths':
            return structureData([cdata.newDeathsOverTime.slice(d1, d2)], sum);

        case 'newCases':
            return structureData([cdata.newCasesOverTime.slice(d1, d2)], sum);

        case 'newTests':
            if (granularity === 'weekly')
                d2 -= 7;
            return stacked([cdata.newCasesOverTime.slice(d1, d2), cdata.newTestsOverTime.slice(d1, d2)], sum);

        case 'newVaccinations':
            return structureData([cdata.newVaccinationsOverTime.slice(d1, d2)], sum);

        case 'newDeathsPerPopulation':
            return structureData([cdata.newDeathsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], sum);

        case 'newCasesPerPopulation':
            return structureData([cdata.newCasesOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], sum);

        case 'newTestsPerPopulation':
            if (granularity === 'weekly')
                d2 -= 7;
            return stacked([
                cdata.newCasesOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population),
                cdata.newTestsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], sum);

        case 'newVaccinationsPerPopulation':
            return stacked([
                cdata.newVaccinationsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population),
                cdata.newVaccinationsOverTime.slice(d1, d2).map(d => d * 1000000 / cdata.population)], sum);

        case 'caseTrend':
            return getTrend(d1, d2, cdata.newCasesOverTime);

        case 'deathTrend':
             return getTrend(d1, d2, cdata.newDeathsOverTime);

        case 'testTrend':
            return getTrend(d1, d2, cdata.newTestsOverTime);

        case 'vaccinationTrend':
            return getTrend(d1, d2, cdata.newVaccinationsOverTime);

        case  'newCases14DMA':
            return structureData([movingAverage(cdata.newCasesOverTime, 14).slice(d1, d2)], sum);

        case  'newDeaths14DMA':
            return structureData([movingAverage(cdata.newDeathsOverTime, 14).slice(d1, d2)], sum);

        case  'newTests14DMA':
            if (granularity === 'weekly')
                d2 -= 7;
            return structureData([movingAverage(cdata.newTestsOverTime, 14).slice(d1, d2)], sum);

        case  'mortalitySeverity':
            return structureData([cdata.mortalitySeverityOverTime.slice(d1, d2)], average);

        case  'caseSeverity':
            return structureData([cdata.caseSeverityOverTime.slice(d1, d1)], average);

        case 'caseMortality':
            return structureData([cdata.deathsOverTime.slice(d1, d2),cdata.casesOverTime.slice(d1, d2)],
                    data => Math.min(1, data[1] > 0 ? data[0] / data[1] : 0 ));

        case 'newCaseMortality':
            return structureData([cdata.newDeathsOverTime.slice(d1, d2),cdata.newCasesOverTime.slice(d1, d2)],
                data => Math.min(1, data[1] > 0 ? data[0] / data[1] : 0 ));


        default:
            console.log("No data for " + dataPoint);
            return undefined;

    }
    function getLastChanged(series) {
        let day = 0;
        series.map((d, ix) => day = Math.max(day, d !== 0 ? ix : 0));
        return day;
    }
     function getTrend(d1, d2, data) {
        //console.log(`Weekly trend ${dataSet.dates[d1]} ${d1} to ${dataSet.dates[d2 - 1]} ${d2 - 1}`);
        const res = []
        for(let d = d1; d < d2; ++d) {
            if (d1 - 14 < 0)
                return 0;
            const prior3 =  data.slice(d - 13, d - 6).reduce((a,v)=> a + v);
            const last3 =  data.slice(d - 6, d + 1).reduce((a,v) => a + v);
            //console.log(`${d} prior3 = ${prior3} last3 = ${last3}`);
            res.push(prior3 ? Math.round((last3 - prior3) * 100 / prior3) + "%" : '');
        }
        return res;
    }
    function sum(sum) {
        return sum[0];
    }
    function average(sum) {
        return sum[0] / (granularity === 'weekly' ? weeklyDays : 1);
    }
    function last(sum, data, ix) {
        return data[0][ix];
    }
    function stacked (dataSets, process) {
        return dataSets.map( dataSet => structureData([dataSet], process));
    }
    function structureData (dataSets, process) {
        if (!(dataSets[0] instanceof Array))
            throw `dataPoint ${dataPoint} invalid data`;

        if (granularity === 'weekly') {
            let acc = new Array(dataSets.length).fill(0);
            return dataSets[0].map((c, ix) => {
                let res = undefined;
                acc = acc.map( (a, dx) => a + dataSets[dx][ix] * 1);
                if ((ix % weeklyDays) === (weeklyDays - 1)) {
                    res = process(acc, dataSets, ix);
                    acc.fill(0);
                }


                return res;
            }).filter(d => d !== undefined);
        } else {
            return  dataSets[0].map((c, ix) => (process(dataSets.map((na, dx) =>  dataSets[dx][ix]), dataSets, ix)));
        }
    }
    function movingAverage(series, period) {
        return series.map((n, ix) => series.slice(Math.max(0, ix - period + 1), ix + 1)
                                            .reduce((a,n)=>a + n, 0) / Math.min(ix + 1, period));
    }
}



