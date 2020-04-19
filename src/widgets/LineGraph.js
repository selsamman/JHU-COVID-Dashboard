import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend, VictoryTheme} from 'victory';
import {colors} from "../config/colors";
import {dataSet} from "../data/timeseries";

export const LineGraph = ({config, id, scale}) => {
    const {widget, anyConfiguring, dataSet, isConfiguring, editWidget, substituteCountry, widgetCountries, getCountryData} = widgetsAPI({id: id});
    const editWidgetEvent = () => anyConfiguring && editWidget(widget.id);

    const labelProps = {
        title: config.name,
        x: 20, y: 0, rowGutter: -12,
        style: {labels: {fontSize: 11}},
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
            left: getPadding(10, 9) * scale,
            top:  isConfiguring? 8 : 60 * scale,
            right: 0,
            bottom: 40 * scale
        },
        height: isConfiguring ? 167 * scale: 250 * scale,
        samples: 4,
        interpolation: "natural",
    };
    const childProps = (country, ix) => {
        return {
            samples: 4,
            data: getCountryData(country)[config.prop]
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
            Math.max(a, getCountryData(c)[config.prop].reduce((a, p) =>
                Math.max(a, Math.floor(p)))));
        const maxDigits = numberWithCommas(maxValue).length;
        const padding = base + maxDigits * perDigit;
        console.log(" maxValue: " + maxValue + "padding increment: " + padding);

        return padding;
    }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
