import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {widgetConfig} from "../config/widgets";
import {widgetsAPI} from "../capi";
import {writeStateToURL} from "../config/urlParameters";

export default ({id}) => {
    const {widget} = widgetsAPI({id: id});
    const config = widgetConfig[widget.type];

    return (
        <div>
            {config.config.map((config, ix) =>
                <WidgetConfigElement config={config} id={id} key={ix} />
            )}
        </div>
    );
};

const WidgetConfigElement = ({id, config}) => {
    const {widget} = widgetsAPI({id: id});
    return (
        <div style={{backgroundColor: "#f4f4f4", padding: 8, marginBottom: 2}}>
        <config.component {...config.props} widgetConfig={widgetConfig[widget.type]} id={id} />
        </div>
    );
}
