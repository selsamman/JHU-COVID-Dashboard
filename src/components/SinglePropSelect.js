import React  from 'react';
import {widgetsAPI} from "../capi";
import  {Dropdown} from 'react-bootstrap';

export default ({dataPoints, id, scale}) => {
    const {widget, addSinglePropToWidget, widgetProps} = widgetsAPI({id: id});
    return (
        <Dropdown size="lg">
            <Dropdown.Toggle
                style={{border: 0, backgroundColor: "#e8e8e8", color: "#202020", fontSize: 12 * scale, padding: 4}}
            >
                {dataPoints[widgetProps[0]]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.getOwnPropertyNames(dataPoints).map(prop =>
                    <Dropdown.Item
                        onSelect={() => {addSinglePropToWidget(prop)}}
                        key={prop}
                        active={prop === widgetProps[0]}
                    >
                        {dataPoints[prop]}
                    </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
};
