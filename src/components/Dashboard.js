import React from 'react';
import { widgetsAPI } from "../capi";
import {scale, widgetConfig} from '../config/widgets';
import {Row, Col, Table} from 'react-bootstrap';

import WidgetConfig from "./WidgetConfig";


export const Dashboard = ({mode}) => {
    const {widgetRows, widgets} = widgetsAPI({});
    console.log("Render Dashboard " + JSON.stringify(widgetsAPI.getState()));
    if (mode === 'table')
        return (
            <Col>
                <Row><Col>
                    <Table borderless>
                        <tbody>
                            {widgetRows.map((widgetRow, row) =>
                                <WidgetTableRow key={row} row={row} />
                            )}
                        </tbody>
                    </Table>
                </Col></Row>
             </Col>
        )
    else
        return (
            <Col>
                    {widgetRows.map((widgetRow, row) =>
                        <WidgetRow key={row} row={row} />
                    )}
                  {false && <Row><Col>{JSON.stringify(widgets)}</Col></Row>}
            </Col>
        )
}

const WidgetRow = ({row})=> {
    const {widgetCols} = widgetsAPI({row: row});
    return (
        <Row xl={2} lg={2} md={1} sm={1} xs={1}>
            {
                widgetCols.map((widget, ix) => {
                    const config =  widgetConfig[widget.type];
                    const WidgetComponent = config.component;
                    return (
                        <Col key={ix}>
                            <WidgetConfig id={widget.id}>
                                <WidgetComponent config={config} key={widget.id} id={widget.id} ix={ix}/>
                             </WidgetConfig>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
const WidgetTableRow = ({row})=> {
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row});
    return (
        <tr >
            {
                widgetCols.map((widget, ix) => {
                    const config =  widgetConfig[widget.type];
                    const WidgetComponent = config.component;
                    return (
                        <td key={ix} rowSpan={widget.rows} colSpan={widget.cols} width={(widget.cols * 100 / 12) + "%"}
                            onClickCapture={()=>{anyConfiguring && editWidget(widget.id)}}
                            style={{borderWidth: anyConfiguring ? 1: 0, borderStyle: "dotted", borderColor:  "#808080"}}
                        >
                            <WidgetConfig id={widget.id}>
                                <WidgetComponent config={config} key={widget.id} id={widget.id} ix={ix}/>
                            </WidgetConfig>
                        </td>
                    )
                }
            )}
        </tr>
    )
}


