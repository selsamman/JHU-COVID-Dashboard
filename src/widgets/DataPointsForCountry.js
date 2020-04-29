import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';

export const DataPointsForCountry = ({id, scale, dataPointsDisplay, dataPointsRender}) => {
    const {isConfiguring, getCountryData, widgetCountries, widgetProps, widget} = widgetsAPI({id: id});
    const country = widgetCountries[0];
    const cpl = widget.cols >= 4 ? 4 : 2;
    return (
        <>
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 18 * scale, textAlign: "center"}}>
                        {country}
                    </Col>
                </Row>
            }
            <Row xs={cpl} sm={cpl} md={cpl} lg={cpl} xl={cpl}>
                {country && widgetProps.map((prop, ix) => (
                    <Col key={prop} style={{ padding: 4}}>
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
    function DataPoint ({description, data, scale, prop}) {
        return (
            <div style={{backgroundColor: "#f4f4f4", padding: 4, border: "1px solid #d8d8d8"}}>
                <div style={{fontSize: 11 * scale, textAlign: 'center', color: "#404040", textTransform: "uppercase", fontWeight: 'bold'}} >
                    {description[0]}
                </div>
                <div style={{fontSize: 15 * scale, textAlign: 'center', color: "#000000"}} >
                    {dataPointsRender[prop](data, scale)}
                </div>
                <div style={{fontSize: 9 * scale, textAlign: 'center', color: "#404040"}} >
                    {description[1]}
                </div>
            </div>
        );
    }
}

