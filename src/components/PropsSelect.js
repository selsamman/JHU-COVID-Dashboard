import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {widgetsAPI} from "../capi";
import {Form, Col} from 'react-bootstrap';

export default ({widgetConfig, id, max, scale}) => {
    const {widget, addPropToWidget, deletePropFromWidget} = widgetsAPI({id: id});
    const onChange = prop => widget.props.includes(prop) ? deletePropFromWidget(prop) : addPropToWidget(prop);
    const isDisabled = prop => widget.props.length >= max && !widget.props.includes(prop);
    return (
        <Form>
            <Form.Row>
                {Object.getOwnPropertyNames(widgetConfig.dataPoints).map(prop => (
                    <Form.Group as={Col} key={prop}>
                        <Form.Check
                            style={{fontSize: 11 * scale}}
                            onChange={()=>onChange(prop)}
                            label={widgetConfig.dataPoints[prop]}
                            disabled={isDisabled(prop)}
                            checked={widget.props.includes(prop)}
                        />
                    </Form.Group>
                ))}
            </Form.Row>
        </Form>
    )
};
