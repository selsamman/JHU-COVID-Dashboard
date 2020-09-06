import React  from 'react';
import {widgetsAPI} from "../capi";
import {Form, Col, Dropdown} from 'react-bootstrap';
import {dateSelect} from "../config/widgets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
const StyledDatePicker = styled(DatePicker)`
& {
    width: ${props => props.width}px;
}
`;
const TimeSelect = ({id, maxProps, scale, weeklyTimeSelection}) => {
    const {widget, setWidgetData, dataSet} = widgetsAPI({id: id}, TimeSelect);
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Dropdown size="sm">
                        <Dropdown.Toggle variant="secondary" size="sm" style={{fontSize: 11 * scale, padding: 4}}>
                            {dateSelect[widget.dateSelect || 'toPresent']}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(dateSelect).map(select =>
                                <Dropdown.Item onSelect={() => {setWidgetData({dateSelect: select})}} key={select}>
                                    {dateSelect[select]}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                {widget.dateSelect === 'chooseDate' &&
                    <Form.Group as={Col}>
                        <span style={{whiteSpace: "nowrap", fontSize: 11 * scale}}>
                            From:
                            <StyledDatePicker minDate={new Date(dataSet.dateRange.from)} maxDate={dataSet.dateRange.to}
                                        dateFormat="yyyy-MM-dd"  width={75* scale}
                                        selected={new Date(widget.fromDate || dataSet.dateRange.from)}
                                        onSelect={(d) => setWidgetData({fromDate: d.getTime()})} key="from"/>
                        </span>
                    </Form.Group>
                }
                {widget.dateSelect === 'chooseDate' &&
                    <Form.Group as={Col}>
                        <span style={{whiteSpace: "nowrap", fontSize: 11 * scale}}>
                            To:
                            <StyledDatePicker minDate={dataSet.dateRange.from} maxDate={dataSet.dateRange.to}
                                        dateFormat="yyyy-MM-dd" width={75* scale}
                                        selected={new Date(widget.toDate || dataSet.dateRange.to)}
                                        onSelect={(d) => setWidgetData({toDate: d.getTime()})} key="to"/>
                        </span>
                    </Form.Group>
                }
                {weeklyTimeSelection &&
                    <Form.Group as={Col}>
                        <Form.Check
                            style={{fontSize: 11 * scale}}
                            onChange={()=>{setWidgetData({granularity: widget.granularity === 'weekly' ? 'daily' : 'weekly'})}}
                            label="Weekly"
                            checked={widget.granularity === 'weekly'}
                        />
                    </Form.Group>
                }
                <Form.Group as={Col}>
                    <Form.Check
                        style={{fontSize: 11 * scale}}
                        onChange={()=>{setWidgetData({newPerWeek: !widget.newPerWeek})}}
                        label="New per Week"
                        checked={!!widget.newPerWeek}
                    />
                </Form.Group>
            </Form.Row>
        </Form>
    )
};
export default TimeSelect;


