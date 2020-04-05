import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend} from 'victory';
import {widgetConfig} from "../config/widgets";
import WidgetConfig from "../components/WidgetConfig";

export const LineGraph = ({id}) => {
    const {widget, isConfiguring, editWidget} = widgetsAPI({id: id});
    //return (<text>{JSON.stringify(widgetConfig[widget.type].childProps(widget, "Germany", 1))}</text>)
    const config = widgetConfig[widget.type];
    const editWidgetEvent = () => editWidget(widget.id);
    return (
        <div>
        {isConfiguring  && <WidgetConfig id={id} />}
            <VictoryChart {...config.parentProps(widget, isConfiguring, editWidgetEvent)}>
                {!isConfiguring && <VictoryLegend {...config.labelProps(widget)} />}
                <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 10}}} />
                <VictoryAxis style={{tickLabels: {angle: 90, fontSize: 8}}} />
                {widget.countries.map( (country, ix) => (
                    <VictoryLine key={ix} {...config.childProps(widget, country, ix, isConfiguring)} />

                ))}
            </VictoryChart>
        </div>

    );
}
