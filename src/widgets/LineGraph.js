import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend, VictoryTheme} from 'victory';
import {colors} from "../config/colors";
import {BarGraph} from "../widgets/BarGraph";
import ChartTitle from "../components/ChartTitle";
import Countries from "../components/Countries";

export const LineGraph = (props) => {
    const {id, scale, dataPoint, name} = props;
    const {dataSet, widgetCountries, getCountryData} = widgetsAPI({id: id});

    if (widgetCountries.length === 1)
        return <BarGraph {...props} />

    const parentProps =  {
        domainPadding: 20,
        theme: VictoryTheme.material,
        padding: {
            left: getPadding(16, 8) * scale,
            top:  10 * scale,
            right: 4,
            bottom: 25 * scale
        },
        height: 150 * scale,
        samples: 4,
        interpolation: "natural",
    };
    const childProps = (country, ix) => {
        return {
            samples: 4,
            data: getCountryData(country)[dataPoint]
                .map((c, ix) => ({x: dataSet.dates[ix].replace(/\/20/,'').replace(/\//, '-'), y: c}))
                .slice(dataSet.dates.length - 30),
            style: {data: {stroke: colors[ix]}, tickLabels: {angle: 45}},
        }
    }
    return (
        <>
            <ChartTitle name={name} scale={scale}  id={id} />
            <Countries countries={widgetCountries} scale={scale} id={id}/>
            <VictoryChart {...parentProps}>
                <VictoryAxis tickCount={10}
                             dependentAxis style={{tickLabels: {fontSize: 10}}}
                             tickFormat={(t) => numberWithCommas(t)}/>
                <VictoryAxis style={{tickLabels: {angle: 90, fontSize: 8}}} />
                {widgetCountries.map( (country, ix) => (
                    <VictoryLine key={ix} {...childProps(country, ix)} />
                ))}
            </VictoryChart>
        </>

    );
    function getPadding(base, perDigit) {
        const maxValue = widgetCountries.reduce((a, c) =>
            Math.max(a, getCountryData(c)[dataPoint].reduce((a, p) =>
                Math.max(a, Math.floor(p)))), 0);
        const maxDigits = numberWithCommas(maxValue).length;
        const padding = base + maxDigits * perDigit;
        return padding;
    }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


