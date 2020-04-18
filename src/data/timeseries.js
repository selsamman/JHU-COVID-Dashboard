import populationByCountry from "./population";
import bent from 'bent';
import {widgetsAPI} from "../capi";
export const dataSet = {
    countries: [],
    countrySubstitution: [],
}

const countryCorrections = {
    "Cote d'Ivoire": "Ivory Coast",
    "\"Korea": "South Korea",
    "Cabo Verde": "Cape Verde",
    "US": "United States",
    "Taiwan*": "Taiwan"
}

function processCountries (data, props) {
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

        dataSet.country.push({
            name: countryName,
            deaths: deaths * 1,
            deathsPerM: deaths * 1000000 / population,
            cases: cases * 1,
            casesPerM: cases * 1000000 / population,
            caseMortality: deaths / cases,
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
export const importJHUData = async (api) => {
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
            importState = processJHUFile(file, api);
            const rawLocation = await getLocation();
            if (rawLocation) {
                console.log(JSON.stringify(rawLocation))
                const location = {
                    country: rawLocation.countryName,
                    state: rawLocation.principalSubdivision,
                }
                rawLocation.localityInfo.administrative.map(o => {
                    if (o.name.match(/county/i))
                        location.county = o.name.replace(/ county/i, '') + ', ' + rawLocation.principalSubdivision;
                });
                adjustDataSetForLocation(location);
            } else {
                adjustDataSetForLocation({country: "United States"});
            }

            return importState
        default:
            return importState;
    }
    async function getLocation() {

        let geo = {
            long:(new URLSearchParams(document.location.search)).get("long"),
            lat: (new URLSearchParams(document.location.search)).get("lat")
        }
        if ((!geo.lat || !geo.long) && navigator.geolocation) {
            let waitForPosition = new Promise(resolve => {
                navigator.geolocation.getCurrentPosition((position) => {
                    geo.long = position.coords.longitude;
                    geo.lat = position.coords.latitude;
                    resolve(true);
                });
            });
            await waitForPosition;
        }
        if (geo.lat && geo.long) {
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?` +
                        `latitude=${geo.lat}&longitude=${geo.long}&localityLanguage=en`;
            const getBuffer = bent('string');
            const location = JSON.parse(await getBuffer(url));

            return location;
        }
        return null;
    }
}

async function readJSFile(filePrefix) {
    const location = window.location;
    let url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = location.protocol + location.host + "/" + filePrefix + "_test.js";
    } else {
        //url = process.env.PUBLIC_URL + "/" + filePrefix + ".csv";
        url = location.protocol + location.host + "/" + filePrefix + ".js";
    }
    console.log(url);
    const getBuffer = bent('string');
    return await getBuffer(url);
    //console.log(csvFiles[filePrefix]);
}
async function readCSVFile(filePrefix) {
    const location = window.location;
    let url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = location.protocol + location.host + "/" + filePrefix + "_test.csv";
    } else {
        //url = process.env.PUBLIC_URL + "/" + filePrefix + ".csv";
        url = location.protocol + location.host + "/" + filePrefix + ".csv";
    }
    console.log(url);
    const getBuffer = bent('string');
    csvFiles[filePrefix] = await getBuffer(url);
    //console.log(csvFiles[filePrefix]);
}
function processCSVFiles() {
    let deaths = [];
    let cases = [];
    let props = {};
    dataSet.country = {};
    dataSet.country = [];
    cases = csvFiles.cases.split("\n").slice(1).filter(l => !!l);
    deaths = csvFiles.deaths.split("\n").slice(1).filter(l => !!l)
    if (cases.length !== deaths.length)
        throw("seriously?");

    cases[0].split(",").map((prop, ix) => {props[prop] = ix});
    //console.log(JSON.stringify(props));
    dataSet.dates = Object.getOwnPropertyNames(props).filter((p)=>p.match(/\d*\/\d*\/\d*/));
    dataSet.dateRange = {
        first: dataSet.dates[0],
        last: dataSet.dates[dataSet.dates.length - 1]
    }
    let sumsProvinces = {};
    let sumWorld = {};
        let countriesWithTotals = {};
    const data = cases.slice(1)
        .map((line,ix)=> sumProvinces(mergeDeaths(line.split(","), ix)))
        .concat(totalsFromProvinces())
        .filter( line => !line[props['Province/State']])
        .sort((a, b) => b[props[dataSet.dateRange.last]] - a[props[dataSet.dateRange.last]]);

    processCountries(data, props);
    dataSet.country.map( c => {dataSet.country[c.name] = true; dataSet.countries.push(c.name);return c.name} );

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
function processJHUFile(file, api) {
    const state = widgetsAPI.getState();
    const {deleteCountryFromWidget, setWidgetData} = api;
    const json = JSON.parse(file.substr(file.indexOf("{")));
    dataSet.country = json.data;
    dataSet.dates = json.dates;
    dataSet.dateRange = {
        first: dataSet.dates[0],
        last: dataSet.dates[dataSet.dates.length - 1]
    }
    processJHUCountries(dataSet);
    Object.getOwnPropertyNames(dataSet.country).map(c => dataSet.countries.push(c));

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

        dataSet.country[countryName] = {
            name: countryName,
            deaths: deaths,
            deathsPerM: deaths * 1000000 / country.population,
            cases: cases,
            casesPerM: cases * 1000000 / country.population,
            caseMortality: deaths / country.cases,
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
function adjustDataSetForLocation(location) {
    const countrySub = {
        "Taiwan Province of China" : "Taiwan",
        "United States of America" : "United States",
        "United States Virgin Islands" : "Virgin Islands",
        "Bolivia (Plurinational State of)" : "Bolivia",
        "Iran (Islamic Republic of)" : "Iran",
        "Republic of Korea" : "South Korea",
        "Republic of Moldova": "Moldova",
        "Russian Federation" : "Russia",
        "United Republic of Tanzania": "Tanzania",
        "Venezuela (Bolivarian Republic of)": "Venezuela",
        "Syrian Arab Republic": "Syria",
        "Lao People's Democratic Republic": "Laos"
    }
    console.log("Adjusting for location " + JSON.stringify(location));
    location.country = countrySub[location.country] || location.country;

    if (location.county && dataSet.country[location.county]) {
        dataSet.countrySubstitution["My County"] = location.county;
        dataSet.countries.push("My County");
    }
    if (location.state && dataSet.country[location.state]) {
        dataSet.countrySubstitution["My State"] = location.state;
        dataSet.countries.push("My State");
    }
    if (location.country && dataSet.country[location.country]) {
        dataSet.countrySubstitution["My Country"] = location.country;
        dataSet.countries.push("My Country");
    }
}
export function substituteCountry(country) {
    return dataSet.countrySubstitution[country] || country;
}

