import * as Widgets from '../widgets';
import { dataSet} from "../data/timeseries";
import CountrySelect from "../components/CountrySelect";
import WidgetSelect from "../components/WidgetSelect";
import PropsSelect from "../components/PropsSelect";
import SingleCountrySelect from "../components/SingleCountrySelect";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const dataPoints = {
    deaths: "Deaths total",
    cases: "Cases total",
    deathsPerM: "Deaths per 1M",
    casesPerM: "Cases per 1M",
    //caseMortality: "Deaths per Case",
}
export const dataPointsDisplay = {
    deaths: ["Deaths", "Total"],
    deathsPerM: ["Deaths", "per 1M People"],
    cases: ["Cases", "Total"],
    casesPerM: ["Cases", "per 1M People"],
};

export const widgetConfig = {

    DataByCountry: TableByCountry("Data Table by Country"),
    DataForCountry: DataForCountry("Individual Data Points"),
    CasesOverTime: LineGraphByCountry( "Total Cases", 'casesOverTime'),
    DeathsOverTime: LineGraphByCountry("Total Deaths", 'deathsOverTime'),
    CasesPerPopulationOverTime: LineGraphByCountry( "Total Cases per 1M People", 'casesPerPopulationOverTime'),
    DeathsPerPopulationOverTime: LineGraphByCountry("Total Deaths per 1M People", 'deathsPerPopulationOverTime'),
    NewCasesOverTime: LineGraphByCountry( "New Cases",'newCasesOverTime'),
    NewDeathsOverTime: LineGraphByCountry("New Deaths",'newDeathsOverTime'),
    NewCasesPerPopulationOverTime: LineGraphByCountry( "New Cases per 1M People",'newCasesPerPopulationOverTime'),
    NewDeathsPerPopulationOverTime: LineGraphByCountry("New Deaths per 1M People",'newDeathsPerPopulationOverTime'),
    Blank: {name: "Blank Space", component: Widgets.BlankWidget, config: [{component: WidgetSelect, props: {}}]}
}
function TableByCountry (name, props)  {
    return {
        name: name,
        component: Widgets.TableByCountry,
        config: [
            {component: WidgetSelect, props: {}},
            {component: CountrySelect, props: {countries: dataSet.countries, max: 20}},
            {component: PropsSelect, props: {max: 4, dataPoints: dataPoints}}
        ],
    }
}
function DataForCountry(name, props)  {
    return {
        name: name,
        component: Widgets.DataPointsForCountry,
        config: [
            {component: WidgetSelect, props: {}},
            {component: SingleCountrySelect, props: {}},
            {component: PropsSelect, props: {max: 4, dataPoints: dataPoints}}
        ],
    }
}

function LineGraphByCountry (name, prop) {
     return {
        name: name,
        component: Widgets.LineGraph,
        config: [
            {component: WidgetSelect, props: {}},
            {component: CountrySelect, props: { max: 6}},
        ],
        prop: prop
    }
};

export const widgetNames = Object.getOwnPropertyNames(widgetConfig);
