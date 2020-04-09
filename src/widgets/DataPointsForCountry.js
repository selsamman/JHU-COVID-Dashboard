import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';
import WidgetConfig from "../components/WidgetConfig";
import {scale} from "../config/widgets";
export const DataPointsForCountry = ({config, widgetComponentConfig, id}) => {
    const {widget, anyConfiguring, isConfiguring, editWidget} = widgetsAPI({id: id});

    const props = config.dataPoints;
    return (
        <div >
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 18 * scale, textAlign: "center"}}>
                        {widget.countries[0]}
                    </Col>
                </Row>
            }
            <Row style={{paddingLeft: 20 * scale, paddingRight: 20 * scale}}>
                {widget.props.map((prop, ix) => (
                    <Col key={prop} style={{backgroundColor: "#f0f0f0", margin: 4, padding: 4}}>
                        <DataPoint
                            key={prop}
                            description={props[prop]}
                            data={config.tableProps(widget, widget.countries[0], prop, ix, isConfiguring).data}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
const DataPoint = ({description, data}) => (
    <div >
        <div style={{fontSize: 20 * scale, textAlign: 'center', color: "#000000"}} >
            {data}
        </div>
        <div style={{fontSize: 8 * scale, textAlign: 'center', color: "#404040"}} >
            {description}
        </div>
    </div>
)
