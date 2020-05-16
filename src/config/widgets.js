import * as Widgets from '../widgets';
import CountrySelect from "../components/CountrySelect";
import WidgetSelect from "../components/WidgetSelect";
import PropsSelect from "../components/PropsSelect";
import SingleCountrySelect from "../components/SingleCountrySelect";
import {ForwardFill} from 'react-bootstrap-icons';
import React from "react";
import SinglePropSelect from "../components/SinglePropSelect";
import {casesSeverityThresholds, deathSeverityThresholds, flu} from "../data/timeseries";

export const widgetNotes = {
    deathsAsPercentOfFlu: ["Death vs Flu is COVID deaths compared to the 149 US deaths per 1M from flu and pneumonia as per NCHS Data Brief 355."],
    deathsAsPercentOfOverall: ["Death vs All is COVID deaths compared to the US annual mortality of 7236 per 1M as per NCHS Data Brief 355."],
    deathTrend: "Deaths Weekly Trend is the number of new deaths in the last 7 days vs the prior 7 seven days.",
    caseTrend: "Cases Weekly Trend is the number of new confirmed cases in the last 7 days vs the prior 7 seven days.",
}

const dataPoints = {
    deaths: "Total Deaths",
    cases: "Total Cases",
    deathsPerM: "Deaths per 1M",
    casesPerM: "Cases per 1M",
    deathTrend: "Deaths Weekly Trend",
    caseTrend: "Cases Weekly Trend",
    newCases: "New Cases",
    newDeaths: "New Deaths",
    caseMortality: "Deaths per Case",
    newDeathsPerPopulation: "New Deaths per 1M",
    newCasesPerPopulation: "New Cases per 1M",
    deathsAsPercentOfFlu: ["Deaths as % of Flu"],
    deathsAsPercentOfOverall: ["Deaths as % of Total"]
}
const dataPointsDisplay = {
    deaths: ["Deaths", "Total"],
    deathsPerM: ["Deaths", "per 1M"],
    cases: ["Cases", "Total"],
    casesPerM: ["Cases", "per 1M"],
    deathTrend: ["Deaths", "weekly trend"],
    caseTrend: ["Cases", "weekly trend"],
    caseMortality: ["Deaths", "per Case"],
    newCases: ["Cases", "recent"],
    newDeaths: ["Deaths", "recent"],
    newDeathsPerPopulation: ["Deaths", "new per 1M"],
    newCasesPerPopulation: ["Cases", "new per 1M"],
    deathsAsPercentOfFlu: ["Deaths", "vs Flu"],
    deathsAsPercentOfOverall: ["Deaths", "vs All"]

};
const dataPointsRender = {
    deaths: numberWithCommas,
    deathsPerM: numberWithCommas,
    cases: numberWithCommas,
    casesPerM: numberWithCommas,
    deathTrend: formatTrend,
    caseTrend: formatTrend,
    caseMortality: numberAsPercent,
    newCases: numberWithCommas,
    newDeaths: numberWithCommas,
    newDeathsPerPopulation: numberWithCommas,
    newCasesPerPopulation: numberWithCommas,
    deathsAsPercentOfFlu: numberAsPercentWhole,
    deathsAsPercentOfOverall: numberAsPercentWhole
};
const severityDataPoints = {
    mortalitySeverity: "Deaths",
    caseSeverity: "Cases",
    mortalitySeverityOverTime: "Deaths over Time",
    caseSeverityOverTime: "Cases over Time",
}
const severityThresholds = {
    mortalitySeverity: deathSeverityThresholds,
    caseSeverity: casesSeverityThresholds,
    mortalitySeverityOverTime: deathSeverityThresholds,
    caseSeverityOverTime: casesSeverityThresholds,
}

export const widgetConfig = {

    DataByCountry: TableByCountry("Table - Data by Country"),
    DataAllCountries: TableAllCountries("Table - All Countries"),
    DataForCountry: DataForCountry("Data Points"),
    CasesOverTime: LineGraphByCountry( "Graph - Total Cases ", 'casesOverTime'),
    DeathsOverTime: LineGraphByCountry("Graph - Total Deaths", 'deathsOverTime'),
    CasesPerPopulationOverTime: LineGraphByCountry( "Graph - Cases per 1M", 'casesPerPopulationOverTime'),
    DeathsPerPopulationOverTime: LineGraphByCountry("Graph - Deaths per 1M", 'deathsPerPopulationOverTime'),
    NewCasesOverTime: LineGraphByCountry( "Graph - New Cases",'newCasesOverTime'),
    NewDeathsOverTime: LineGraphByCountry("Graph - New Deaths",'newDeathsOverTime'),
    NewCasesPerPopulationOverTime: LineGraphByCountry( "Graph - New Cases per 1M",'newCasesPerPopulationOverTime'),
    NewDeathsPerPopulationOverTime: LineGraphByCountry("Graph - New Deaths per 1M",'newDeathsPerPopulationOverTime'),
    CaseMortalityOverTime: LineGraphByCountry("Graph - Deaths per Case",'caseMortalityOverTime'),
    Blank: {name: "Blank Space", component: Widgets.BlankWidget, config: [{component: WidgetSelect, props: {}}]},
    WorldMap: WorldMapForCountry("World Map")
}
function WorldMapForCountry (name) {

    return {
        name: name,
        component: Widgets.WorldMap,
        dataPoints: severityDataPoints,
        dataPointsDisplay: severityDataPoints,
        defaultDataPoint: "mortalitySeverityOverTime",
        severityThresholds,
        config: [
            {component: WidgetSelect},
            {component: SinglePropSelect}
        ]}
}
function TableByCountry (name, props)  {
    return {
        name: name,
        component: Widgets.TableByCountry,
        maxCountries: 20,
        allCountries: false,
        maxProps: 6,
        dataPoints, dataPointsDisplay, dataPointsRender,
        defaultDataPoint: "casesPerM",
        orderColumns: true,
        sortDirection: true,
        selectedRow: true,
        includeStates: true,
        includeCounties: true,
        scrollable: true,
        config: [
            {component: WidgetSelect},
            {component: CountrySelect},
            {component: PropsSelect}
        ],
    }
}
function TableAllCountries (name, props)  {
    return {
        name: name,
        component: Widgets.TableByCountry,
        maxProps: 6,
        allCountries: true,
        dataPoints, dataPointsDisplay, dataPointsRender,
        defaultDataPoint: "casesPerM",
        orderColumns: true,
        sortDirection: true,
        selectedRow: true,
        scrollable: true,
        config: [
            {component: WidgetSelect},
            {component: PropsSelect}
        ],
    }
}
function DataForCountry(name, props)  {
    return {
        name: name,
        component: Widgets.DataPointsForCountry,
        maxCountries: 6,
        maxProps: 8,
        dataPoints, dataPointsDisplay, dataPointsRender,
        defaultDataPoint: "casesPerM",
        config: [
            {component: WidgetSelect},
            {component: SingleCountrySelect},
            {component: PropsSelect}
        ],
    }
}

function LineGraphByCountry (name, prop) {
     return {
        name: name,
        component: Widgets.LineGraph,
         maxCountries: 6,
         config: [
            {component: WidgetSelect},
            {component: CountrySelect},
        ],
        dataPoint: prop
    }
};

export const widgetNames = Object.getOwnPropertyNames(widgetConfig);

export function numberWithCommas(x) {
    if(x.toString().length > 0 && !isNaN (x * 1))
        x = Math.round(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function numberAsPercent(x) {
    if(x.toString().length > 0 && !isNaN (x * 1))
        x = Math.round(x*10000);
        x = x / 100;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%";
}
export function numberAsPercentWhole(x) {
    if(x.toString().length > 0 && !isNaN (x * 1))
        x = Math.round(x*10000);
    x = Math.round(x / 100);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%";
}
function formatTrend (x, scale) {
    return (
        <>
            {x}
            {x.toString().length > 0 &&
                <div style={{display: "inline-block", transform: `rotate(${rotate(x)}deg)`}}>
                    <ForwardFill size={18 * (scale || 1)} color={color(x)}
                                 style={{marginTop: -5 * (scale || 1), marginLeft: 3 * (scale || 1)}}/>
                </div>
            }
        </>
    );
    function color(x) {
        const colors = ["#ff2a26", "#606060", "#4cbd43"];
        x = x.replace(/%/,'');
        if (x <= 0) return colors[2];
        else return colors[0];
        return colors[1];
    }
    function rotate(x) {

        x = x.replace(/%/,'');
       return 0 - Math.round(Math.min(Math.max(-100, x), 100)) * .9 ;
    }
}
