import React from 'react';
import {widgetsAPI} from "../capi";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryLegend} from 'victory';
import WidgetConfig from "../components/WidgetConfig";

export const LineGraph = ({config, id}) => {
    const {widget, isConfiguring, editWidget} = widgetsAPI({id: id});
    //return (<text>{JSON.stringify(widgetConfig[widget.type].childProps(widget, "Germany", 1))}</text>)
    const editWidgetEvent = () => editWidget(widget.id);
    return (
        <div>
        {isConfiguring  && <WidgetConfig config={config} id={id} />}
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
