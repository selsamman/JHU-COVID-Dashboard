import React from 'react';
import {widgetsAPI} from "../capi";
import {Table} from 'react-bootstrap';
import {substituteCountry, dataSet} from "../data/timeseries";

export const TableByCountry = ({config, scale, id}) => {
    const {widget, isConfiguring, anyConfiguring, editWidget} = widgetsAPI({id: id});
    const props = config.dataPointsDisplay;

    return (
        <div onClickCapture={()=>{!anyConfiguring && editWidget()}}>
            <Table  striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{fontSize: 14 * scale, textAlign: 'left', fontWeight: 'bold', paddingBottom: 10 * scale}}>
                        Country
                        </th>
                        {Object.getOwnPropertyNames(props).filter(p => widget.props.includes(p)).map((prop, ix) => (
                            <th key={prop}>
                                <DataPoint description={props[prop]} scale={scale} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getSortedCountries(widget, props, config)
                        .map( country => (
                        <tr key={substituteCountry(country)}>
                            <td>{substituteCountry(country)}</td>
                            {Object.getOwnPropertyNames(props).filter(p => widget.props.includes(p)).map(prop => (
                                    <td key={prop} style={{fontSize: 12 * scale, textAlign: 'right'}}>
                                        {numberWithCommas(config.tableProps(widget,
                                            substituteCountry(country), prop, ).data)}
                                    </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
const getSortedCountries = (widget, props, config) => {
    const prop = Object.getOwnPropertyNames(props).filter(p => widget.props.includes(p))[0];
    return widget.countries
        .filter(c => dataSet.country[substituteCountry(c)])
        .sort((c1, c2) =>
        config.tableProps(widget, substituteCountry(c2), prop).data -
        config.tableProps(widget, substituteCountry(c1), prop).data
    )
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
