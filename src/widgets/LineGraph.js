import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend, VictoryTheme} from 'victory';
import {colors} from "../config/colors";
import {BarGraph} from "../widgets/BarGraph";

export const LineGraph = (props) => {
    const {id, scale, dataPoint} = props;
    const {dataSet, isConfiguring, widgetCountries, getCountryData, name} = widgetsAPI({id: id});

    if (widgetCountries.length === 1)
        return <BarGraph {...props} />

    const labelProps = {
        title: name,
        x: 20, y: 0, rowGutter: -12,
        style: {labels: {fontSize: 11}, title: {fontSize: 13, fontWeight: "bold"}},
        padding: {bottom: 20},
        centerTitle: true,
        itemsPerRow: 3,
        data: widgetCountries.map( (c, ix) => ({name: c, symbol: {fill: colors[ix]}})),
        orientation: "horizontal",
    };
    const parentProps =  {
        domainPadding: 20,
        theme: VictoryTheme.material,
        padding: {
            left: getPadding(16, 7) * scale,
            top:  isConfiguring ? 8 : 60 * scale,
            right: 4,
            bottom: 40 * scale
        },
        height: isConfiguring ? 167 * scale: 250 * scale,
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
            <VictoryChart {...parentProps}>
                {!isConfiguring && <VictoryLegend {...labelProps} />}
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
        console.log(" maxValue: " + maxValue + "padding increment: " + padding);

        return padding;
    }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


