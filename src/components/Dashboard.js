import React from 'react';
import { widgetsAPI } from "../capi";
import {scale, widgetConfig} from '../config/widgets';
import {Row, Col, Table} from 'react-bootstrap';
import {DashboardHeader} from "./DashboardHeader";
import WidgetConfig from "./WidgetConfig";

const mobileScale = .9;
const gridScaleBase = 1.5;
const gridScaleBaseMin = .8;
const gridScaleBaseMax = 1.2;

export const Dashboard = ({mode}) => {
    const {widgetRows, widgets} = widgetsAPI({}, Dashboard);
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
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row}, WidgetRow);
    return (
        <Row xl={2} lg={2} md={1} sm={1} xs={1}>
            {
                widgetCols.map((widget, ix) => {
                    return (
                        <Col key={ix} onClick={()=>{anyConfiguring && editWidget(widget.id)}}>
                            <Widget widget={widget} mode={mode} scale={mobileScale} ix={ix} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}
const WidgetTableRow = ({row, mode})=> {
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row}, WidgetTableRow);
    const scale = (widget) => Math.max(gridScaleBaseMin,(Math.min(gridScaleBaseMax, widget.cols * gridScaleBase / 6)));
    return (
        <tr >
            {
                widgetCols.map((widget, ix) => {
                    return (
                        <td key={ix} rowSpan={widget.rows} colSpan={widget.cols} width={(widget.cols * 100 / 12) + "%"}
                            onClick={()=>{anyConfiguring && editWidget(widget.id)}}
                            style={{borderWidth: anyConfiguring ? 1: 0, borderStyle: "dotted", borderColor:  "#808080"}}
                        >
                            <Widget widget={widget} mode={mode} scale={scale(widget)} ix={ix} />
                        </td>
                    )
                }
            )}
        </tr>
    )
}
const Widget = React.memo(({widget, mode, scale, ix}) => {
    const config =  widgetConfig[widget.type];
    const WidgetComponent = config.component;
    return (
        <WidgetConfig id={widget.id} mode={mode} scale={scale}>
            <WidgetComponent {...config} key={widget.id} id={widget.id} ix={ix}  mode={mode} scale={scale}/>
        </WidgetConfig>
    )
});


