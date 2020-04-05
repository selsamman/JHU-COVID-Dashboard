import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Button, Dropdown, DropdownButton, Container} from 'react-bootstrap';
import {widgetsAPI} from "../capi";
import {widgetConfig} from "../config/widgets";

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
        <config.component {...config.props} id={id} />
    );
}
