import * as Widgets from '../widgets';
import CountrySelect from "../components/CountrySelect";
import WidgetSelect from "../components/WidgetSelect";
import PropsSelect from "../components/PropsSelect";
import SingleCountrySelect from "../components/SingleCountrySelect";
import {ForwardFill} from 'react-bootstrap-icons';
import React from "react";
import SinglePropSelect from "../components/SinglePropSelect";
import {casesSeverityThresholds, deathSeverityThresholds, flu} from "../data/timeseries";
import TimeSelect from "../components/TimeSelect";

export const widgetNotes = {
    deathsAsPercentOfFlu: ["Death vs Flu is COVID deaths compared to the 149 US deaths per 1M from flu and pneumonia as per NCHS Data Brief 355."],
    deathsAsPercentOfOverall: ["Death vs All is COVID deaths compared to the US annual mortality of 7236 per 1M as per NCHS Data Brief 355."],
    deathTrend: "Deaths Weekly Trend is the number of new deaths in the last 7 days vs the prior 7 seven days.",
    caseTrend: "Cases Weekly Trend is the number of new confirmed cases in the last 7 days vs the prior 7 seven days.",
}

export const dateSelect = {
    toPresent: "Latest Data",
    chooseDate: "Select Date",
    dateSlider: "Date Slider",
}
const dataPoints = {
    cases: "Total Cases",
    deaths: "Total Deaths",
    tests: "Total Tests",

    casesPerM: "Cases per 1M",
    deathsPerM: "Deaths per 1M",
    testsPerM: "Tests per 1M",

    caseTrend: "Cases Trend",
    deathTrend: "Deaths Trend",
    testTrend: "Testing Trend",


    newCases: "New Cases",
    newDeaths: "New Deaths",
    newTests: "New Tests",

    newDeathsPerPopulation: "New Deaths per 1M",
    newCasesPerPopulation: "New Cases per 1M",
    newTestsPerPopulation: "New Tests per 1M",

    caseMortality: "Deaths per Case",
    deathsAsPercentOfFlu: ["Deaths as % of Flu"],
    deathsAsPercentOfOverall: ["Deaths as % of Total"]

}
const dataPointsDisplay = {
    deaths: ["Deaths", "Total"],
    deathsPerM: ["Deaths", "per 1M"],
    cases: ["Cases", "Total"],
    casesPerM: ["Cases", "per 1M"],
    tests: ["Tests", "Total"],
    testsPerM: ["Tests", "per 1M"],
    deathTrend: ["Deaths", "weekly trend"],
    caseTrend: ["Cases", "weekly trend"],
    testTrend: ["Tests", "weekly trend"],
    caseMortality: ["Deaths", "per Case"],
    newCases: ["Cases", "recent"],
    newDeaths: ["Deaths", "recent"],
    newTests: ["Tests", "recent"],
    newDeathsPerPopulation: ["Deaths", "recent / 1M"],
    newCasesPerPopulation: ["Cases", "recent / 1M"],
    newTestsPerPopulation: ["Tests", "recent / 1M"],
    deathsAsPercentOfFlu: ["Deaths", "vs Flu"],
    deathsAsPercentOfOverall: ["Deaths", "vs All"]

};
const dataPointsRender = {
    deaths: numberWithCommas,
    deathsPerM: numberWithCommas,
    deathsPerPopulation: numberWithCommas,
    cases: numberWithCommas,
    casesPerM: numberWithCommas,
    casesPerPopulation: numberWithCommas,
    tests: numberWithCommas,
    casePerTest: numberWithCommas,
    testsPerM: numberWithCommas,
    testsPerPopulation: numberWithCommas,
    deathTrend: formatTrend,
    caseTrend: formatTrend,
    testTrend: formatTrendReverse,
    caseMortality: numberAsPercent,
    newCaseMortality: numberAsPercent,
    newCases: numberWithCommas,
    newDeaths: numberWithCommas,
    newTests: numberWithCommas,
    casePerTestPerPopulation: numberAsPercent,
    positiveRatio: numberAsPercent,
    newDeathsPerPopulation: numberWithCommas,
    newCasesPerPopulation: numberWithCommas,
    newTestsPerPopulation: numberWithCommas,
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

    CasePerTestOverTime: LineGraphByCountry("Graph - Total Tests", 'testsOverTime', false),
    CasePerTestPerPopulationOverTime: LineGraphByCountry("Graph - Test Coverage", 'casePerTestPerPopulationOverTime', true),
    PositiveTestsOverTime: LineGraphByCountry("Graph - Positive Tests", 'positiveRatioOverTime'),

    CasesPerPopulationOverTime: LineGraphByCountry( "Graph - Cases per 1M", 'casesPerPopulationOverTime'),
    DeathsPerPopulationOverTime: LineGraphByCountry("Graph - Deaths per 1M", 'deathsPerPopulationOverTime'),
    TestsPerPopulationOverTime: LineGraphByCountry("Graph - Tests per 1M", 'testsPerPopulationOverTime'),

    NewCasesOverTime: LineGraphByCountry( "Graph - New Cases",'newCasesOverTime'),
    NewDeathsOverTime: LineGraphByCountry("Graph - New Deaths",'newDeathsOverTime'),
    NewTestsOverTime: LineGraphByCountry("Graph - New Tests",'newTestsOverTime', true),

    NewCasesPerPopulationOverTime: LineGraphByCountry( "Graph - New Cases per 1M",'newCasesPerPopulationOverTime'),
    NewDeathsPerPopulationOverTime: LineGraphByCountry("Graph - New Deaths per 1M",'newDeathsPerPopulationOverTime'),
    NewTestsPerPopulationOverTime: LineGraphByCountry("Graph - New Tests per 1M",'newTestsPerPopulationOverTime', true),

    CaseMortalityOverTime: LineGraphByCountry("Graph - Deaths per Case",'caseMortalityOverTime'),
    NewCaseMortalityOverTime: LineGraphByCountry("Graph - New Deaths per New Cases",'newCaseMortalityOverTime'),
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
            {component: PropsSelect},
            {component: TimeSelect},
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
            {component: PropsSelect},
            {component: TimeSelect},
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
            {component: PropsSelect},
            {component: TimeSelect},
        ],
    }
}

function LineGraphByCountry (name, prop, isStacked) {
     return {
         name: name,
         component: Widgets.LineGraph,
         maxCountries: 6,
         config: [
            {component: WidgetSelect},
            {component: CountrySelect},
            {component: TimeSelect},
         ],
         dataPoint: prop,
         dataPointsRender,
         weeklyTimeSelection: true,
         isStacked: !!isStacked
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
export function formatDate(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}
function formatTrendReverse(x, scale) {
    return formatTrend(x, scale, true)
}
function formatTrend (x, scale, reverse) {
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
        const colors = reverse ? ["#4cbd43", "#606060", "#ff2a26"] : ["#ff2a26", "#606060", "#4cbd43"];
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
