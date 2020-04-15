import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend} from 'victory';
import WidgetConfig from "../components/WidgetConfig";
import {dataSet, substituteCountry} from "../data/timeseries";

export const LineGraph = ({config, id, scale}) => {
    const {widget, anyConfiguring, isConfiguring, isConfiguringData, editWidget} = widgetsAPI({id: id});
    const editWidgetEvent = () => anyConfiguring && editWidget(widget.id);

    return (
        <React.Fragment>
            <VictoryChart {...config.parentProps(widget, isConfiguringData, scale)}>
                {!isConfiguringData && <VictoryLegend {...config.labelProps(widget)} />}
                <VictoryAxis tickCount={10} dependentAxis style={{tickLabels: {fontSize: 10}}}
                             tickFormat={(t) => numberWithCommas(t)}/>
                <VictoryAxis style={{tickLabels: {angle: 90, fontSize: 8}}} />
                {widget.countries.filter(c => dataSet.country[substituteCountry(c)]).map( (country, ix) => (
                    <VictoryLine key={ix} {...config.childProps(widget, substituteCountry(country), ix, isConfiguringData)} />
                ))}
            </VictoryChart>
        </React.Fragment>

    );
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
