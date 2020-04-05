
import populationByCountry from "./population";
import bent from 'bent';

export const props = {};
export let dates;
export let first;
export let last;
let deaths = [];
let cases = [];

const countryCorrections = {
    "Cote d'Ivoire": "Ivory Coast",
    "\"Korea": "South Korea",
    "Cabo Verde": "Cape Verde",
    "US": "United States",
    "Taiwan*": "Taiwan"
}

export let data = [];

export const country = [];

function processCountries () {
    data.map( point => {
        const deaths = point[point.length - 1][1];
        const cases = point[point.length - 1][0];
        let countryName = point[props['Country/Region']];
        countryName = countryCorrections[countryName] ? countryCorrections[countryName] : countryName;

        const population = populationByCountry[countryName];
        if (!population)
            return;
        const caseSeries = point.slice(4, point.length - 1).map(point=>point[0] * 1);
        const deathSeries = point.slice(4, point.length - 1).map(point=>point[1] * 1);

        const casePerPopulationSeries = caseSeries.map( c => c * 1000000 / population);
        const deathPerPopulationSeries = deathSeries.map( c => c * 1000000 / population);

        const newCaseSeries = caseSeries.map((c, ix) => ix === 0 ? 0 : c - caseSeries[ix -1]);
        const newDeathSeries = deathSeries.map((c, ix) => ix === 0 ? 0 : c - deathSeries[ix -1]);

        const newCasePerPopulationSeries = newCaseSeries.map( c => c * 1000000 / population);
        const newDeathPerPopulationSeries = newDeathSeries.map( c => c * 1000000 / population);

        const newCaseAccelerationSeries = newCaseSeries.map((p, ix) =>
            ix === 0 || newCaseSeries[ix - 1] === 0 ? 0 : (p - newCaseSeries[ix - 1]) / newCaseSeries[ix - 1] );
        const newDeathAccelerationSeries = newDeathSeries.map((p, ix) =>
            ix === 0 || newDeathSeries[ix - 1] === 0 ? 0 : (p - newDeathSeries[ix - 1]) / newDeathSeries[ix - 1] );

        const periods = 3;
        const recentNewCaseAcceleration = newCaseAccelerationSeries.slice(newCaseAccelerationSeries.length - periods)
              .reduce((a,b) => (a + b)) / periods;
        const recentCaseDeathAcceleration = newDeathAccelerationSeries.slice(newDeathAccelerationSeries.length - periods)
            .reduce((a,b) => (a + b)) / periods;

        country.push({
            name: countryName,
            deaths: deaths * 1,
            deathsPerM: deaths * 1000000 / population,
            cases: cases * 1,
            casesPerM: cases * 1000000 / population,
            caseMortality: deaths / cases,
            populationMortality: population ? deaths * 1000000 / population : - 1,
            casesOverTime: caseSeries,
            deathsOverTime: deathSeries,
            newCasesOverTime: newCaseSeries,
            newDeathsOverTime: newDeathSeries,
            newCasesPerPopulationOverTime: newCasePerPopulationSeries,
            newDeathsPerPopulationOverTime: newDeathPerPopulationSeries,
            casesPerPopulationOverTime: casePerPopulationSeries,
            deathsPerPopulationOverTime: deathPerPopulationSeries,
            newCaseAccelerationOverTime: newCaseAccelerationSeries,
            newDeathAccelerationOverTime: newDeathAccelerationSeries
        });
    });
}
export const countryHash = {};
export let countries = []
let importState = 'none';
const csvFiles = {};
export const importData = async () => {
    switch (importState) {
        case "none":
            try {
                importState = "loading";
                await readCSVFile("cases");
                await readCSVFile("deaths");

            } catch (e) {
                console.log("error loading data" + e + e.stack);
                importState = "error";
                return importState
            };
            processCSVFiles();
            importState = "loaded";
            return importState
        default:
            return importState;
    }
}
async function readCSVFile(filePrefix) {
    const location = window.location;
    let url;
    //if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = location.protocol + location.host + "/" + filePrefix + ".csv";
    //} else {
    //    url = process.env.PUBLIC_URL + "/" + filePrefix + ".csv";
    //}
    console.log(url);
    const getBuffer = bent('string');
    csvFiles[filePrefix] = await getBuffer(url);
    //console.log(csvFiles[filePrefix]);
}
function processCSVFiles() {
    cases = csvFiles.cases.split("\n").slice(1);
    deaths = csvFiles.deaths.split("\n").slice(1);
    if (cases.length !== deaths.length)
        throw("seriously?");

    cases[0].split(",").map((prop, ix) => {props[prop] = ix});
    //console.log(JSON.stringify(props));
    dates = Object.getOwnPropertyNames(props).filter((p)=>p.match(/\d*\/\d*\/\d*/));
    first = dates[0];
    last = dates[dates.length - 1];
    let sumsProvinces = {};
    let sumWorld = {};
    let countriesWithTotals = {};
    data = cases.slice(1)
        .map((line,ix)=> sumProvinces(mergeDeaths(line.split(","), ix)))
        .concat(totalsFromProvinces())
        .filter( line => !line[props['Province/State']])
        .sort((a, b) => b[props[last]] - a[props[last]]);

    processCountries();
    country.map( c => {countryHash[c.name] = true; countries.push(c.name);return c.name} );

    function mergeDeaths(line, ix) {
        const deathLine = deaths[ix + 1].split(",");
        return line.map( (col, jx) => jx >= 4 ? [col, deathLine[jx]] : col);
    }
    function sumProvinces (line) {
        if (!line[props['Province/State']]) {
            countriesWithTotals[props['Country/Region']] = true;
            return line;
        }
        sumsProvinces[line[props['Country/Region']]] = sumsProvinces[line[props['Country/Region']]] || {
            deaths: [], cases: [], line: line,
        }
        const sum = sumsProvinces[line[props['Country/Region']]];
        const caseSeries = line.slice(4, line.length - 1).map(point=>point[0] * 1);
        const deathSeries = line.slice(4, line.length - 1).map(point=>point[1] * 1);
        caseSeries.map((point, ix) => sum.cases[ix] = (sum.cases[ix] || 0) + point);
        deathSeries.map((point, ix) => sum.deaths[ix] = (sum.deaths[ix] || 0) + point);
        return line;
    }
    function totalsFromProvinces () {
        let additionalLines = [];
        Object.getOwnPropertyNames(sumsProvinces).map(province => {
            const sum = sumsProvinces[province];
            additionalLines.push(['', sum.line[1], sum.line[2], sum.line[3]]
                .concat(sum.cases.map( (d, ix) => ([d, sum.deaths[ix]]))));
        })
        return additionalLines;
    }

}

