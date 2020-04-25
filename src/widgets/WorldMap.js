import React, {useState} from 'react';
import { widgetsAPI} from "../capi";
import {ReactComponent as World} from "./world.svg";
import styled, {keyframes, css} from 'styled-components'
import {Col, Row} from "react-bootstrap";

const colors = ["#77bd1b", "#c9e034", "#ffeb0a", "#ff8614", "#e81422"];
const animationTime = 10;
const Map = React.memo(({cols, dataSet, dataPoint, mode}) => {
    const countries = dataSet.countries.map(c => dataSet.country[c])
    const StyledWorld = dataPoint.match(/OverTime/i)
        ? getStyledWorldAnimated(cols, countries, dataPoint, mode)
        : getStyledWorld(cols, countries, dataPoint, mode);
    return <StyledWorld/>
});
const ChangingDate = React.memo(({dataSet}) => {
    const Component = getDates(dataSet.dates);
    return <Component />
});
export const WorldMap = ({id, scale, dataPointsDisplay, severityThresholds, mode}) => {
    const {widget, widgetProps, dataSet, isConfiguring} = widgetsAPI({id: id});

    return (
        <>
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 14 * scale, textAlign: "center"}}>
                        {dataPointsDisplay[widgetProps[0]]}
                    </Col>
                </Row>
            }
            {!isConfiguring &&
                <Row>
                    <Col style={{fontSize: 14 * scale, textAlign: "center"}}>
                        <ChangingDate dataSet={dataSet}>xxx</ChangingDate>
                    </Col>
                </Row>
            }
            <Row style={{paddingLeft: 5 * scale, paddingRight: 5 * scale}}>
                <Col>
                    <Map cols={widget.cols} dataSet={dataSet} dataPoint={widgetProps[0]} mode={mode}/>
                </Col>
            </Row>
            <Row style={{fontSize: 12, paddingLeft: "4%", paddingRight: "10%", paddingTop: "5%"}}>

                {severityThresholds[widgetProps[0]].map( (threshold, ix) =>
                    <Col style={{padding: 0}} key={ix}>
                        <Color color={colors[ix]} />
                        &nbsp; {ix > 0 && "> "}{threshold} per 1M
                    </Col>
                )}

            </Row>
        </>
    );
}

const Color = ({color}) => (
    <span style={{backgroundColor: color, display: "inline-block",  width: 12, fontSize: 7, border: "1px solid black"}}>&nbsp;</span>
)
function getDates (range) {
    const fade = range.map((m, i) => `${i * (i)/range.length}% \{content: "${formatDate(m)}"}`);
    const animation = keyframes`${fade}`;
    const styles = css`&:after \{content: ""; animation: ${animation} 1 ${animationTime}s forwards\};`;
    return styled.div`${styles}`;
    function formatDate (d) {let p = d.split("/");return p[2]+"00-"+p[0]+"-"+p[1]}
}
function getStyledWorldAnimated (cols, countries, dataPoint, mode) {
    const styles = countries.filter(c => c && c.type === 'country').map( data => {
        const range = data[dataPoint];
        const last = data[dataPoint][range.length - 1] || 0;
        const fade = range.map((m, i) => m > 0 && (i === 0 || range[i - 1] !== m) ?
            `${i * (i)/range.length}% \{fill: ${colors[m]}\};` : "")
        const animation = keyframes`${fade}`;
        return (css`#${data.code} \{fill: ${colors[last]}; animation: ${animation} 1 ${animationTime}s forwards\};`)
    });

    return (styled(World)`${getSizeStyle(cols, mode)}${styles} `);
};
function getStyledWorld (cols, countries, dataPoint, mode) {
    const styles = countries.filter(c => c && c.type === 'country').map( data => (
        `#${data.code} \{fill: ${colors[data[dataPoint]]}; \};`));
    return (styled(World)`${getSizeStyle(cols, mode)}${styles} `);
};
function getSizeStyle (cols, mode) {
    const baseScale = .019 * cols;
    const multipliers = {xs: 1, sm:1.05, md: 1.45, lg: 1.9, xl: 2.3}
    const scale = baseScale * (multipliers[mode] || 1);
    const baseMargin = 2.5 * cols;
    const margin = baseMargin * (multipliers[mode] || 1)
    return`
          margin-left: -${margin}px;
          width: 100%;
          height: auto;
          path {transform: scale(${scale});};
    `
}
