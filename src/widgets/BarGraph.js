import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryChart, VictoryBar} from 'victory';
import {widgetConfig} from "../config/widgets";

export const BarGraph = ({id}) => {
    const {widget, isConfiguring, anyConfiguring, editWidget} = widgetsAPI({id: id});
    //return (<text>{JSON.stringify(widgetConfig[widget.type].childProps(widget))}</text>)
    const config = widgetConfig[widget.type];
    const editWidgetEvent = () => anyConfiguring && editWidget(widget.id);
    return (
        <VictoryChart {...config.parentProps(widget, isConfiguring, editWidgetEvent)}>
            <VictoryBar {...config.childProps(widget, isConfiguring)} />
        </VictoryChart>
    );
}
