import * as Widgets from '../widgets';
import { dataSet} from "../data/timeseries";
import CountrySelect from "../components/CountrySelect";
import WidgetSelect from "../components/WidgetSelect";
import PropsSelect from "../components/PropsSelect";
import SingleCountrySelect from "../components/SingleCountrySelect";
import {ForwardFill} from 'react-bootstrap-icons';
import React from "react";

export const dataPoints = {
    deaths: "Deaths total",
    cases: "Cases total",
    deathsPerM: "Deaths per 1M",
    casesPerM: "Cases per 1M",
    deathTrend: "Deaths trend",
    caseTrend: "Cases trend",

    //caseMortality: "Deaths per Case",
}
export const dataPointsDisplay = {
    deaths: ["Deaths", "Total"],
    deathsPerM: ["Deaths", "per 1M People"],
    cases: ["Cases", "Total"],
    casesPerM: ["Cases", "per 1M People"],
    deathTrend: ["Deaths", "weekly trend"],
    caseTrend: ["Cases", "weekly trend"],
};
export const dataPointsRender = {
    deaths: numberWithCommas,
    deathsPerM: numberWithCommas,
    cases: numberWithCommas,
    casesPerM: numberWithCommas,
    deathTrend: formatTrend,
    caseTrend: formatTrend,
};
export const widgetConfig = {

    DataByCountry: TableByCountry("Table - Data by Country"),
    DataForCountry: DataForCountry("Data Points"),
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
            {component: PropsSelect, props: {max: 6, dataPoints: dataPoints}}
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
function BarGraphByCountry (name, prop) {
    return {
        name: name,
        component: Widgets.BarGraph,
        config: [
            {component: WidgetSelect, props: {}},
            {component: SingleCountrySelect, props: { }},
        ],
        prop: prop
    }
};

export const widgetNames = Object.getOwnPropertyNames(widgetConfig);

export function numberWithCommas(x) {
    if(x.toString().length > 0 && !isNaN (x * 1))
        x = Math.round(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
