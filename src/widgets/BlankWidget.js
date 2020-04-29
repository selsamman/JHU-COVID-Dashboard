import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';
export const BlankWidget = ({config, id, scale}) => {
    const {widget, anyConfiguring, isConfiguring, editWidget} = widgetsAPI({id: id});

    const props = config.dataPoints;
    return (
        <React.Fragment >
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 18 * scale, textAlign: "center"}}>
                        &nbsp;
                    </Col>
                </Row>
            }
         </React.Fragment>
    );
}
