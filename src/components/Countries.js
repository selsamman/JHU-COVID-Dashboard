import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { CircleFill } from 'react-bootstrap-icons';
import {colors} from "../config/colors";
import {widgetsAPI} from "../capi";

export default ({id, scale, countries}) => {
    const {isConfiguring} = widgetsAPI({id: id});
    return (
        <>
            {!isConfiguring &&
                <Row style={{paddingLeft: 20 * scale}}>
                    {countries.map( (c, ix) =>
                        <Col key={ix} md={4} xs={4} lg={4} style={{padding: 0, lineHeight: 1.2 * scale}}>
                            <CircleFill size={10 * scale} color={colors[ix % colors.length]} />
                            &nbsp;
                            <span style={{fontSize: 11 * scale, color: "black"}}>{c}</span>
                        </Col>
                    )}
                </Row>
            }
        </>
    );
};

