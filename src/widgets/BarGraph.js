import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLegend, VictoryAxis} from 'victory';
import {colors} from "../config/colors";

export const BarGraph = ({dataPoint, id, scale, name}) => {
    const {dataSet, isConfiguring, widgetCountries, getCountryData} = widgetsAPI({id: id});
    const country = widgetCountries[0];
    const labelProps = {
        title: name + " - " + country,
        x: 20, y: 0, rowGutter: -12,
        style: {labels: {fontSize: 11}, title: {fontSize: 13, fontWeight: "bold", textAlign: "center"}},
        padding: {bottom: 0},
        centerTitle: true,
        itemsPerRow: 1,
        data: [],
        orientation: "horizontal",
    };
    const parentProps =  {

        theme: VictoryTheme.material,
        padding: {
            left: getPadding(5, 5) * scale,
            top:  isConfiguring? 8 : 60 * scale,
            right: 0,
            bottom: 40 * scale
        },
        height: isConfiguring ? 167 * scale: 240 * scale,

        samples: 4,
    };
    const childProps = (country) => {
        return {
            data: getCountryData(country)[dataPoint]
                .map((c, ix) => ({x: dataSet.dates[ix].replace(/\/20/,'').replace(/\//, '-'), y: c}))
                .slice(dataSet.dates.length - 30),
            style: {data: {stroke: colors[0]}, tickLabels: {angle: 45}},

            samples: 4,
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
                    <VictoryBar {...childProps(country)} />
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
        console.log("BarGraph maxValue: " + maxValue + "padding increment: " + padding);

        return padding;
    }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
