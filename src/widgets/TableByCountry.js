import React from 'react';
import {widgetsAPI} from "../capi";
import {Table} from 'react-bootstrap';
import {dataPoints, dataPointsDisplay, dataPointsRender} from "../config/widgets";

export const TableByCountry = ({config, scale, id}) => {
    const {widget, anyConfiguring, editWidget, widgetCountries, getCountryData} = widgetsAPI({id: id});

    return (
        <>
            <Table  striped bordered hover size="sm" responsive="sm">
                <thead>
                    <tr>
                        <th style={{fontSize: 12 * scale, textAlign: 'left', fontWeight: 'bold', paddingBottom: 10 * scale}}>
                        Country
                        </th>
                        {Object.getOwnPropertyNames(dataPoints).filter(p => widget.props.includes(p)).map((prop, ix) => (
                            <th key={prop}>
                                <DataPoint description={dataPointsDisplay[prop]} scale={scale} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getSortedCountries()
                        .map( country => (
                        <tr key={country}>
                            <td style={{fontSize: 12 * scale}}>{country}</td>
                            {Object.getOwnPropertyNames(dataPoints).filter(p => widget.props.includes(p)).map(prop => (
                                    <td key={prop} style={{fontSize: 12 * scale, textAlign: 'right'}}>
                                        {dataPointsRender[prop](getCountryData(country)[prop])}
                                    </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
    function getSortedCountries() {
        const prop = Object.getOwnPropertyNames(dataPoints).filter(p => widget.props.includes(p))[0];
        return widgetCountries
            .sort((c1, c2) => adjust(getCountryData(c2)[prop]) - adjust(getCountryData(c1)[prop]))
        function adjust(data) {
            //alert("data = " + data);
            return data.toString().replace(/%/, '');
        }
    }
}

const DataPoint = ({description, scale}) => (
    <div >
        <div style={{fontSize: 11 * scale, textAlign: 'right'}} >
            {description[0]}
        </div>
        <div style={{fontSize: 8 * scale, textAlign: 'right'}} >
            {description[1]}
        </div>
    </div>
)
function numberWithCommas(x) {
    if(x.toString().length > 0 && !isNaN (x * 1))
        x = Math.round(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
