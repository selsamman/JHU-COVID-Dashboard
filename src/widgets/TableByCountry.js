import React from 'react';
import {widgetsAPI} from "../capi";

import {Table} from 'react-bootstrap';
import WidgetConfig from "../components/WidgetConfig";
export const TableByCountry = ({config, widgetComponentConfig, id}) => {
    const {widget, isConfiguring, editWidget} = widgetsAPI({id: id});

    const props = config.dataPoints;
    return (
        <div onClickCapture={()=>{!isConfiguring && editWidget()}}>
            {isConfiguring  && <WidgetConfig id={id} />}
            <Table  striped bordered hover size={isConfiguring ? "sm" : "lg"}>
                <thead>
                    <tr>
                        <th>Country</th>
                        {widget.props.map(prop => (
                            <th key={prop}>
                                {props[prop]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {widget.countries.map( country => (
                        <tr key={country}>
                            <td>{country}</td>
                            {widget.props.map((prop, ix) => (
                                <td key={prop}>
                                    {config.tableProps(widget, country, prop, ix, isConfiguring).data}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
