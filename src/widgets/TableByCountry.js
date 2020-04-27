import React from 'react';
import {widgetsAPI} from "../capi";
import {Table} from 'react-bootstrap';

export const TableByCountry = ({scale, id, dataPointsDisplay, dataPointsRender, allCountries}) => {
    const {widgetCountries, getCountryData, widgetProps, dataSet, widget} = widgetsAPI({id: id});

    return (
        <>
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
                    {getSortedCountries()
                        .map( country => (
                        <tr key={country}>
                            <td style={{fontSize: 12 * scale}}>{country}</td>
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
        return allCountries ? sortedCountries.slice(0, 10) : sortedCountries;
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
