import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {widgetsAPI} from "../capi";

export default ({id, scale, name}) => {
    const {isConfiguring} = widgetsAPI({id: id});
    return (
        <>
            {!isConfiguring &&
                <Row style={{padding: 0}}>
                    <Col style={{padding: 0, lineHeight: 1.2 * scale, textAlign: "center", marginBottom: 10 * scale}}>
                        <span style={{fontSize: 15 * scale, color: "black"}}>{name.replace(/.*- /, '')}</span>
                    </Col>
                </Row>
            }
        </>
    );
};

