import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';
import WidgetConfig from "../components/WidgetConfig";

export const DataPointsForCountry = ({config, widgetComponentConfig, id, scale}) => {
    const {widget, anyConfiguring, isConfiguring, editWidget} = widgetsAPI({id: id});

    //const props = config.dataPoints;
    const displayProps = config.dataPointsDisplay;
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
                            scale={1.4}
                            key={prop}
                            description={displayProps[prop]}
                            data={config.tableProps(widget, widget.countries[0], prop, ix, isConfiguring).data}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
const DataPoint = ({description, data, scale}) => (
    <div >
        <div style={{fontSize: 9 * scale, textAlign: 'center', color: "#404040", textTransform: "uppercase", fontWeight: 'bold'}} >
            {description[0]}
        </div>
        <div style={{fontSize: 16 * scale, textAlign: 'center', color: "#000000"}} >
            {numberWithCommas(data)}
        </div>
        <div style={{fontSize: 7 * scale, textAlign: 'center', color: "#404040"}} >
            {description[1]}
        </div>
    </div>
)
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
