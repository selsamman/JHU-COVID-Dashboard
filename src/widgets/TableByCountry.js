import React from 'react';
import {widgetsAPI} from "../capi";
import {Col, Form, Table} from 'react-bootstrap';
import ChartTitle from "../components/ChartTitle";
import styled, {css}from "styled-components";
import {ReactComponent as World} from "./world.svg";
import ScrollingTable, {scrollIntoView} from "../components/ScrollingTable";

export const TableByCountry = ({scale, id, dataPointsDisplay, dataPoints, dataPointsRender, allCountries}) => {
    const {widgetCountries, getCountryData, widgetProps, dataSet, widget, name,
           dashboardSelectedLocation, setDashboardSelectedLocation} = widgetsAPI({id: id}, TableByCountry);
    const title = (widget.includeStates ? "State " : "") + (widget.includeCounties ? "County " : "") +
                (allCountries ? `Top ${widget.displayCount || 5} ` : '') + dataPoints[widgetProps[0]];
    const scrollId = name + "-" + widget.id;
    return (
        <>
            <ChartTitle name={title} scale={scale}  id={id} />
            <ScrollingTable height={widget.rows * 350} headerHeight={50} enable={!!widget.scroll} id={scrollId}>
            <Table  striped bordered hover size="sm" responsive="sm" className="TableByCountry">
                <thead>
                    <tr>
                        <th style={{fontSize: 12 * scale, textAlign: 'left', fontWeight: 'bold', paddingBottom: 10 * scale}}>
                            {(widget.includeStates ? "State " : (widget.includeCounties ? "County " : "Country"))}
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
                        <tr key={country}
                            ref={(ref) => ref && dashboardSelectedLocation === country && scrollIntoView(ref)}>
                            <td style={{fontSize: 12 * scale}} id={getId(widget.id, country)}>
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
            </ScrollingTable>
        </>
    );
    function getSortedCountries() {
        const countries = allCountries
            ? Object.getOwnPropertyNames(dataSet.country).filter(c => c !== "The Whole World" )
                .filter(c => {
                    const data = getCountryData(c);
                    if (!(widget.allData || (data.population > 1000000 && data.deathsPerM > 10 && data.casesPerM > 1000)))
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
function getId(id, country) {
    return `country-${id}-${country.replace(/[^A-Za-z]/g, '_')}`;
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
