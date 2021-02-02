import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryBar, VictoryTheme, VictoryScatter, VictoryTooltip, VictoryStack} from 'victory';
import {colors} from "../config/colors";

import ChartTitle from "../components/ChartTitle";
import Countries from "../components/Countries";

export const LineGraph = (props) => {
    const {id, scale, dataPoint, dataPointsRender, name, isStacked} = props;
    const {widgetCountries, getCountryDataPoints, fromDate, toDate, granularity} = widgetsAPI({id: id}, LineGraph);
    const data = widgetCountries.map(country => getCountryDataPoints(country, dataPoint, fromDate, toDate, granularity, isStacked));
    const isBar = widgetCountries.length === 1;
    const data14DMA = isBar ? getCountryDataPoints(widgetCountries[0], dataPoint + "14DMA", fromDate, toDate, granularity) : undefined;
    const VictoryBarLine = isBar ? VictoryBar : VictoryLine;
    const formatFunction = dataPointsRender[dataPoint.replace(/OverTime/, '')];
    if (!formatFunction)
        throw("No format function for " + dataPoint.replace(/OverTime/, ''));
    const parentProps =  {
        domainPadding: 20,
        theme: VictoryTheme.material,
        padding: {
            left: getPadding(16, 17) * scale,
            top:  10 * scale,
            right: 4,
            bottom: 25 * scale
        },
        height: 150 * scale,
        samples: 4,
        interpolation: "natural",
    };
    const childProps = (data, ix) => {
        return {
            samples: 4,
            data: data,
            style: isBar ? {data: {fill: colors[ix]}, tickLabels: {angle: 45}} :
                           {data: {stroke: colors[ix]}, tickLabels: {angle: 45}},
            alignment: "start",
        }

    }

    return (
        <>
            {isBar &&
            <ChartTitle name={name} scale={scale}  subTitle={widgetCountries[0]} id={id} />
            }
            {!isBar && <>
                <Countries countries={widgetCountries} scale={scale} id={id}/>
                <ChartTitle name={name}  scale={scale} id={id}/>
            </>}
            <VictoryChart {...parentProps}>
                <VictoryAxis tickCount={8} fixLabelOverlap={true}
                             dependentAxis style={{tickLabels: {fontSize: 10}}}
                             tickFormat={(t) => formatFunction(t)}/>
                <VictoryAxis tickCount={15} style={{tickLabels: {angle: 90, fontSize: 8}}} />
                {!isStacked && widgetCountries.map( (country, ix) => (
                    <VictoryBarLine key={ix} {...childProps(data[ix],ix)}
                                    labels={({ datum }) => `${formatFunction(datum.y)}`}
                                    labelComponent={<VictoryTooltip />}/>
                ))}
                {isStacked &&
                    <VictoryStack>
                        {data[0].map((data, ix) => (
                            <VictoryBarLine key={ix} {...childProps(data, ix == 0 ? 2 : 0)}
                                            labels={({ datum }) => `${formatFunction(datum.y)}`}
                                            labelComponent={<VictoryTooltip />}/>
                        ))}
                    </VictoryStack>
                }
                {data14DMA &&
                    <VictoryScatter {...childProps(data14DMA, 2)} />
                }
            </VictoryChart>
        </>

    );
    function getPadding(base, perDigit) {
        const maxValue = data.reduce((a, data) =>
            Math.max(a, data.reduce((a, p) => Math.max(a, Math.floor(p.y)))), 0);
        const maxDigits = formatFunction(maxValue).length;
        const padding = base + maxDigits * perDigit;
        return padding;
    }
}


