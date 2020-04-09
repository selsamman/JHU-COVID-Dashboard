import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';
import WidgetConfig from "../components/WidgetConfig";
import {scale} from "../config/widgets";
export const BlankWidget = ({config, id}) => {
    const {widget, anyConfiguring, isConfiguring, editWidget} = widgetsAPI({id: id});

    const props = config.dataPoints;
    return (
        <div >
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 18 * scale, textAlign: "center"}}>
                        &nbsp;
                    </Col>
                </Row>
            }
         </div>
    );
}
