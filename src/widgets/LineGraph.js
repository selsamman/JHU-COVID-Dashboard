import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend} from 'victory';
import WidgetConfig from "../components/WidgetConfig";

export const LineGraph = ({config, id}) => {
    const {widget, anyConfiguring, isConfiguring, isConfiguringData, editWidget} = widgetsAPI({id: id});
    const editWidgetEvent = () => anyConfiguring && editWidget(widget.id);
    return (
        <div>
            <VictoryChart {...config.parentProps(widget, isConfiguringData, editWidgetEvent)}>
                {!isConfiguringData && <VictoryLegend {...config.labelProps(widget)} />}
                <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 10}}} />
                <VictoryAxis style={{tickLabels: {angle: 90, fontSize: 8}}} />
                {widget.countries.map( (country, ix) => (
                    <VictoryLine key={ix} {...config.childProps(widget, country, ix, isConfiguringData)} />
                ))}
            </VictoryChart>
        </div>

    );
}
