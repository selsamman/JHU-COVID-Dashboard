import bent from 'bent';

export let dataSet = {
    countries: ["My Country", "My State", "My County", "Selected Location"],
    justCountries: ["My Country"],
    justCounties: [ "My County"],
    justStates: ["My State"],
}

export const flu= 168 // Based on mortality rate of the flu;
export const deathSeverityThresholds = [0, 1, flu / 8, flu / 4, flu];
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
    dataSet.dateRange = {
        first: dataSet.dates[0],
        last: dataSet.dates[dataSet.dates.length - 1]
    }
    processJHUCountries(dataSet);
    Object.getOwnPropertyNames(dataSet.country)
        .map(c => dataSet.countries.push(c));
    Object.getOwnPropertyNames(dataSet.country)
        .filter(c => c === "My Country" || dataSet.country[c].type === 'country')
        .map(c => dataSet.justCountries.push(c));
    Object.getOwnPropertyNames(dataSet.country)
        .filter(c=>c === "My County" || dataSet.country[c].type === 'county')
        .map(c => dataSet.justCounties.push(c));
    Object.getOwnPropertyNames(dataSet.country)
        .filter(c=>c === "My State" || dataSet.country[c].type === 'state' || dataSet.country[c].type === 'province')
        .map(c => dataSet.justStates.push(c));
    console.log(`${dataSet.justCountries.length} countries`);
    console.log(`${dataSet.justStates.length} states`);
    console.log(`${dataSet.justCounties.length} counties`);
    let status = "loaded";
    return status;
}
function processJHUCountries (dataSet) {
    dataSet.country["The Whole World"] = dataSet.country["Total"];
    delete dataSet.country["Total"];
    for (let countryName in  dataSet.country) {

        const country = dataSet.country[countryName];

        const cases = country.cases[country.cases.length - 1];
        const deaths = country.deaths[country.deaths.length - 1];

        const casePerPopulationSeries = country.cases.map( c => c * 1000000 / country.population);
        const deathPerPopulationSeries = country.deaths.map( c => c * 1000000 / country.population);

        const newCaseSeries = country.cases.map((c, ix) => ix === 0 ? 0 : c - country.cases[ix -1]);
        const newDeathSeries = country.deaths.map((c, ix) => ix === 0 ? 0 : c - country.deaths[ix -1]);

        const newCasePerPopulationSeries = newCaseSeries.map( c => c * 1000000 / country.population);
        const newDeathPerPopulationSeries = newDeathSeries.map( c => c * 1000000 / country.population);

        const priorFirst = newCaseSeries.length - 14
        const priorLast =  newCaseSeries.length - 7;
        const lastFirst = priorFirst + 7;
        const lastLast = priorLast + 7;

        let prior3 =  newCaseSeries.reduce((a,v,x)=>x >= priorFirst && x <= priorLast ? a + v : a);
        let last3 =  newCaseSeries.reduce((a,v,x)=>x >= lastFirst && x <= lastLast ? a + v : a);
        const caseTrend = prior3 ? Math.round((last3 - prior3) * 100 / prior3) + "%" : '';

        prior3 =  newDeathSeries.reduce((a,v,x)=>x >= priorFirst && x <= priorLast ? a + v : a);
        last3 =  newDeathSeries.reduce((a,v,x)=>x >= lastFirst && x <= lastLast ? a + v : a);
        const deathTrend = prior3 ? Math.round((last3 - prior3) * 100 / prior3) + "%" : '';

        const deathsPerM = deaths * 1000000 / country.population;
        const casesPerM =  cases * 1000000 / country.population;

        const mortalitySeveritySeries = deathPerPopulationSeries.map(deathsPerM => (
        deathSeverityThresholds.reduce((accum, threshold, ix) => (
            deathsPerM >= threshold ? ix : accum), 0)));
        const mortalitySeverity = mortalitySeveritySeries[mortalitySeveritySeries.length - 1];

        const caseSeveritySeries = casePerPopulationSeries.map(deathsPerM => (
            casesSeverityThresholds.reduce((accum, threshold, ix) => (
                deathsPerM >= threshold ? ix : accum), 0)));
        const caseSeverity = caseSeveritySeries[caseSeveritySeries.length - 1];
        const caseMortalitySeries = country.deaths.map((d, ix) => d && country.cases[ix] ? d / country.cases[ix] : "");

            dataSet.country[countryName] = {
            name: countryName,
            type: country.type,
            code: country.code,
            deaths, cases,
            mortalitySeverity, caseSeverity,
            mortalitySeverityOverTime: mortalitySeveritySeries,
            caseSeverityOverTime: caseSeveritySeries,
            deathsPerM,
            casesPerM,
            caseTrend, deathTrend,
            caseMortality: deaths / cases,
            caseMortalityOverTime: caseMortalitySeries,
            newDeaths: newDeathSeries[newDeathSeries.length - 1],
            newCases: newCaseSeries[newDeathSeries.length - 1],
            newDeathsPerPopulation: newDeathSeries[newDeathSeries.length - 1] * 1000000 / country.population,
            newCasesPerPopulation: newDeathSeries[newDeathSeries.length - 1] * 1000000 / country.population,
            casesOverTime: country.cases,
            deathsOverTime: country.deaths,
            newCasesOverTime: newCaseSeries,
            newDeathsOverTime: newDeathSeries,
            newCasesPerPopulationOverTime: newCasePerPopulationSeries,
            newDeathsPerPopulationOverTime: newDeathPerPopulationSeries,
            casesPerPopulationOverTime: casePerPopulationSeries,
            deathsPerPopulationOverTime: deathPerPopulationSeries,
        };
    };
}


