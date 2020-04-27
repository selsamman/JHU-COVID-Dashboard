import React  from 'react';
import {widgetsAPI} from "../capi";
import {Form, Col, InputGroup, FormControl} from 'react-bootstrap';
import {IconWrapperToolbar} from "./IconWrapper";
import {CaretLeftFill, CaretRightFill} from "react-bootstrap-icons";
import {MoveTool} from "./WidgetConfig";

export default ({dataPoints, id, maxProps, scale, sortDirection, allCountries, dataPointsDisplay}) => {
    const {widget, addPropToWidget, deletePropFromWidget, widgetProps, setWidgetData} = widgetsAPI({id: id});
    const onChange = prop => widget.props.includes(prop) ? deletePropFromWidget(prop) : addPropToWidget(prop);
    const isDisabled = prop => widget.props.length >= maxProps && !widget.props.includes(prop);
    return (
        <Form>
            <Form.Row>
                {Object.getOwnPropertyNames(dataPoints).map(prop => (
                    <Form.Group as={Col} key={prop}>
                        <Form.Check
                            style={{fontSize: 11 * scale}}
                            onChange={()=>onChange(prop)}
                            label={dataPoints[prop]}
                            disabled={isDisabled(prop)}
                            checked={widget.props.includes(prop)}
                        />
                    </Form.Group>
                ))}
            </Form.Row>
            {widgetProps.length > 1 &&
                <Form.Row>
                    {widgetProps.map((prop, ix) => (
                        <Form.Group as={Col} key={ix}>
                            <DataPoint prop={prop} ix={ix} />
                        </Form.Group>
                    ))}
                </Form.Row>
            }
            {(sortDirection || allCountries) &&
                <Form.Row>
                    {sortDirection &&
                        <Form.Group as={Col}>
                            <Form.Check
                                style={{fontSize: 11 * scale}}
                                onChange={()=>{setWidgetData({sortUp :!widget.sortUp})}}
                                label="Lowest First"
                                checked={widget.sortUp}
                            />
                        </Form.Group>
                    }
                    {sortDirection &&
                        <Form.Group as={Col}>
                            <Form.Check
                                style={{fontSize: 11 * scale}}
                                onChange={()=>{setWidgetData({allData: !widget.allData})}}
                                label="Case/Death Threshold"
                                checked={!widget.allData}
                            />
                        </Form.Group>
                    }
                    {allCountries &&
                        <Form.Group as={Col}>
                            <Form.Check
                                style={{fontSize: 11 * scale}}
                                onChange={()=>{setWidgetData({includeCounties: !widget.includeCounties})}}
                                label="Include Counties"
                                checked={widget.includeCounties}
                            />
                        </Form.Group>
                    }
                    {allCountries &&
                        <Form.Group as={Col}>
                            <Form.Check
                                style={{fontSize: 11 * scale}}
                                onChange={()=>{setWidgetData({includeStates: !widget.includeStates})}}
                                label="Include States"
                                checked={widget.includeStates}
                            />
                        </Form.Group>
                        }
                </Form.Row>
            }
        </Form>
    )
    function move(pix, amount) {
        setWidgetData({
            props: widgetProps.map((p, ix) => {
                if (ix === pix)
                    return widgetProps[pix + amount];
                else if (ix === pix + amount)
                    return widgetProps[pix];
                return p;
            })
        });
    }
    function DataPoint ({prop, ix}) {
        const description = dataPointsDisplay[prop];
        return (
            <div >
                <div className="d-flex justify-content-center" >
                    <MoveTool iconComponent={CaretLeftFill}
                              enabled={ix > 0} click={() => move(ix, -1)} scale={scale} />
                    <MoveTool iconComponent={CaretRightFill}
                              enabled={ix < widgetProps.length - 1} click={() => move(ix, 1)} scale={scale} />
                </div>
                <div style={{fontSize: 11 * scale, textAlign: 'center'}} >
                    {description[0]}
                </div>
                <div style={{fontSize: 8 * scale, textAlign: 'center'}} >
                    {description[1]}
                </div>
            </div>
        )
    }

};


