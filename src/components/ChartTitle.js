import React from 'react';
import {Row, Col} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {widgetsAPI} from "../capi";

const ChartTitle = ({id, scale, name, subTitle}) => {
    const {isConfiguring} = widgetsAPI({id: id}, ChartTitle);
    return (
        <>
            {!isConfiguring &&
                <Row style={{padding: 0}}>
                    <Col style={{padding: 0, lineHeight: 1.2 * scale, textAlign: "center", marginBottom: 10 * scale}}>
                        <div style={{fontSize: 15 * scale, color: "black"}}>{name.replace(/.*- /, '')}</div>
                        {subTitle && <div style={{fontSize: 12 * scale, color: "black"}}>{subTitle}</div>}
                    </Col>
                </Row>
            }
        </>
    );
};
export default ChartTitle;

