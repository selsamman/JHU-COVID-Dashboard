import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryChart, VictoryBar, VictoryScatter, VictoryTheme, VictoryLegend, VictoryAxis} from 'victory';
import {colors} from "../config/colors";
import Countries from "../components/Countries";
import ChartTitle from "../components/ChartTitle";

export const BarGraph = ({dataPoint, id, scale, name}) => {
    const {dataSet, widgetCountries, getCountryData, widget} = widgetsAPI({id: id}, BarGraph);
    const country = widgetCountries[0];
    const has14DMA = !!getCountryData(country)[dataPoint + "14DMA"];
    const parentProps =  {

        theme: VictoryTheme.material,
        padding: {
            left: getPadding(16, 5) * scale,
            top:  10 * scale,
            right: 6,
            bottom: 25 * scale
        },
        height: 150 * scale,
        samples: 4,
    };
    const childProps = (country) => {
        return {
            data: getCountryData(country)[dataPoint]
                .map((c, ix) => ({x: dataSet.dates[ix].replace(/\/20/,'').replace(/\//, '-'), y: c}))
                .slice(dataSet.dates.length - 30),
            style: {data: {fill: colors[0]}, tickLabels: {angle: 45}},
            alignment: "start",
            samples: 4,
        }
    }
    const childProps14DMA = (country) => {
        return {
            data: getCountryData(country)[dataPoint + "14DMA"]
                .map((c, ix) => ({x: dataSet.dates[ix].replace(/\/20/,'').replace(/\//, '-'), y: c}))
                .slice(dataSet.dates.length - 30),
            style: {data: {fill: colors[2]}, tickLabels: {angle: 45}},
            alignment: "start",
            samples: 4,
        }
    }
    return (
        <>
            <ChartTitle name={name} subTitle={country} scale={scale} id={id}/>
            <VictoryChart {...parentProps}>
                <VictoryAxis tickCount={10}
                             dependentAxis style={{tickLabels: {fontSize: 10}}}
                             tickFormat={(t) => numberWithCommas(t)}/>
                <VictoryAxis style={{tickLabels: {angle: 90, fontSize: 8}}} />
                <VictoryBar {...childProps(country)} />
                {has14DMA &&
                    <VictoryScatter {...childProps14DMA(country)}></VictoryScatter>}
            </VictoryChart>
        </>

    );
    function getPadding(base, perDigit) {
        const maxValue = widgetCountries.reduce((a, c) =>
            Math.max(a, getCountryData(c)[dataPoint].reduce((a, p) =>
                Math.max(a, Math.floor(p)))
            ), 0
        );
        const maxDigits = numberWithCommas(maxValue).length;
        const padding = base + maxDigits * perDigit;
        return padding;
    }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
