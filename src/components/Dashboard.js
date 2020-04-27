import React from 'react';
import { widgetsAPI } from "../capi";
import {scale, widgetConfig} from '../config/widgets';
import {Row, Col, Table} from 'react-bootstrap';
import {DashboardHeader} from "./DashboardHeader";
import WidgetConfig from "./WidgetConfig";

const mobileScale = 1;
const gridScaleBase = 1.5;
const gridScaleBaseMin = .8;
const gridScaleBaseMax = 1.2;

export const Dashboard = ({mode}) => {
    const {widgetRows, widgets} = widgetsAPI({});
    if (mode === 'lg'  || mode  === 'xl' )
        return (
            <Col>

                <Row><Col>
                    <Table borderless style={{tableLayout: "fixed", width: '100%'}}>
                        <colgroup>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                        </colgroup>
                        <tbody>
                            {widgetRows.map((widgetRow, row) =>
                                <WidgetTableRow key={row} row={row} mode={mode}/>
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
                        <WidgetRow key={row} row={row} mode={mode}/>
                    )}
                  {false && <Row><Col>{JSON.stringify(widgets)}</Col></Row>}
            </Col>
        )
}

const WidgetRow = ({row, mode})=> {
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row});
    return (
        <Row xl={2} lg={2} md={1} sm={1} xs={1}>
            {
                widgetCols.map((widget, ix) => {
                    const config =  widgetConfig[widget.type];
                    const WidgetComponent = config.component;
                    return (
                        <Col key={ix}
                             onClick={()=>{anyConfiguring && editWidget(widget.id)}}
                        >
                            <WidgetConfig id={widget.id} mode={mode} scale={mobileScale}>
                                <WidgetComponent {...config} mode={mode} key={widget.id} id={widget.id} ix={ix}  scale={mobileScale}/>
                             </WidgetConfig>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
const WidgetTableRow = ({row, mode})=> {
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row});
    const scale = (widget) => Math.max(gridScaleBaseMin,(Math.min(gridScaleBaseMax, widget.cols * gridScaleBase / 6)));
    return (
        <tr >
            {
                widgetCols.map((widget, ix) => {
                    const config =  widgetConfig[widget.type];
                    const WidgetComponent = config.component;
                    return (
                        <td key={ix} rowSpan={widget.rows} colSpan={widget.cols} width={(widget.cols * 100 / 12) + "%"}
                            onClick={()=>{anyConfiguring && editWidget(widget.id)}}
                            style={{borderWidth: anyConfiguring ? 1: 0, borderStyle: "dotted", borderColor:  "#808080"}}
                        >
                            <WidgetConfig id={widget.id} mode={mode} scale={scale(widget)}>
                                <WidgetComponent {...config} key={widget.id} id={widget.id} ix={ix}  mode={mode} scale={scale(widget)}/>
                            </WidgetConfig>
                        </td>
                    )
                }
            )}
        </tr>
    )
}


