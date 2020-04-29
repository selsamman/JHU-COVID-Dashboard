import React from 'react';
import {widgetsAPI} from "../capi";
import {Col, Form, Table} from 'react-bootstrap';
import ChartTitle from "../components/ChartTitle";

export const TableByCountry = ({scale, id, dataPointsDisplay, dataPoints, dataPointsRender, allCountries}) => {
    const {widgetCountries, getCountryData, widgetProps, dataSet, widget,
           dashboardSelectedLocation, setDashboardSelectedLocation} = widgetsAPI({id: id});
    const title = (allCountries ? `Top ${widget.displayCount || 5} ` : '') + dataPoints[widgetProps[0]]
    return (
        <>
            <ChartTitle name={title} scale={scale}  id={id} />
            <Table  striped bordered hover size="sm" responsive="sm">
                <thead>
                    <tr>
                        <th style={{fontSize: 12 * scale, textAlign: 'left', fontWeight: 'bold', paddingBottom: 10 * scale}}>
                        Country
                        </th>
                        {widgetProps.map((prop, ix) => (
                            <th key={prop}>
                                <DataPoint description={dataPointsDisplay[prop]} scale={scale} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getSortedCountries().map( country => (
                        <tr key={country}>
                            <td style={{fontSize: 12 * scale}}>
                                {widget.selectCountry &&
                                    <Form.Check type="radio"
                                        onChange={()=>{setDashboardSelectedLocation(country)}}
                                        label={country}
                                        checked={dashboardSelectedLocation === country}
                                    />
                                }
                                {!widget.selectCountry &&
                                    <span>{country}</span>
                                }
                            </td>
                            {widgetProps.map(prop => (
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
        const countries = allCountries
            ? Object.getOwnPropertyNames(dataSet.country).filter(c => c !== "The Whole World" )
                .filter(c => {
                    const data = getCountryData(c);
                    if (!(widget.allData || (data.deathsPerM > 10 && data.casesPerM > 1000)))
                        return false;
                    return widget.includeCounties && data.type === "county" ||
                           widget.includeStates && data.type === "state" ||
                           data.type === "country"
                })
            : widgetCountries
        const sortedCountries = countries
            .sort((c1, c2) => !widget.sortUp
                ? adjust(getCountryData(c2)[widgetProps[0]]) - adjust(getCountryData(c1)[widgetProps[0]])
                : adjust(getCountryData(c1)[widgetProps[0]]) - adjust(getCountryData(c2)[widgetProps[0]])
            )
        return allCountries ? sortedCountries.slice(0, widget.displayCount || 5) : sortedCountries;
        function adjust(data) {
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
