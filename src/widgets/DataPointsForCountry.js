import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';
import {dataSet} from "../data/timeseries";
import {dataPointsDisplay, dataPointsRender} from "../config/widgets";

export const DataPointsForCountry = ({id, scale}) => {
    const {widget, isConfiguring, getCountryData, widgetCountries} = widgetsAPI({id: id});

      const country = widgetCountries[0];

    return (
        <>
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 20 * scale, textAlign: "center"}}>
                        {country}
                    </Col>
                </Row>
            }
            <Row style={{paddingLeft: 5 * scale, paddingRight: 5 * scale}}>
                {country && widget.props.map((prop, ix) => (
                    <Col key={prop} style={{backgroundColor: "#f0f0f0", margin: 4, padding: 4}}>
                        <DataPoint
                            scale={scale}
                            key={prop}
                            prop={prop}
                            description={dataPointsDisplay[prop]}
                            data={getCountryData(country)[prop]}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );

}
const DataPoint = ({description, data, scale, prop}) => (
    <div >
        <div style={{fontSize: 11 * scale, textAlign: 'center', color: "#404040", textTransform: "uppercase", fontWeight: 'bold'}} >
            {description[0]}
        </div>
        <div style={{fontSize: 16 * scale, textAlign: 'center', color: "#000000"}} >
            {dataPointsRender[prop](data, scale)}
        </div>
        <div style={{fontSize: 9 * scale, textAlign: 'center', color: "#404040"}} >
            {description[1]}
        </div>
    </div>
)
