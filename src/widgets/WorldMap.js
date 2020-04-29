import React, {useRef, useState, useEffect} from 'react';
import { widgetsAPI} from "../capi";
import {ReactComponent as World} from "./world.svg";
import styled, {keyframes, css} from 'styled-components'
import {Col, Row} from "react-bootstrap";
import {CaretRightFill, PencilSquare} from "react-bootstrap-icons";
import {IconWrapperHeader} from "../components/IconWrapper";
import {AnimateRange} from "./AnimateRange";
import ChartTitle from "../components/ChartTitle";

const colors = ["#77bd1b", "#c9e034", "#ffeb0a", "#ff8614", "#e81422"];
const animationTime = 10;

const Map = React.memo(({cols, dataSet, dataPoint, mode, replay, isAnimated}) => {
    const countries = dataSet.countries.map(c => dataSet.country[c])
    const StyledWorld = isAnimated
        ? getStyledWorldAnimated(cols, countries, dataPoint, mode)
        : getStyledWorld(cols, countries, dataPoint, mode);
    return <StyledWorld/>
});

export const WorldMap = ({id, scale, dataPointsDisplay, severityThresholds, mode}) => {
    const {widget, widgetProps, dataSet, isConfiguring} = widgetsAPI({id: id});
    const isAnimated = !!widgetProps[0].match(/OverTime/i);
    const [replay, setReplay] = useState(0);
    const dates = dataSet.dates.slice(dataSet.dates.length - dataSet.country["United States"].caseSeverityOverTime.length);
    return (
        <>
            <ChartTitle name={dataPointsDisplay[widgetProps[0]]} id={id} scale={scale} />
            {!isConfiguring && isAnimated &&
                <Row>
                    <Col style={{fontSize: 11 * scale, textAlign: "center"}}>
                        <span style={{minWidth: 70*scale, display: "inline-block", textAlign: "left"}}>
                            <AnimateRange count={dates.length} animationTime={animationTime} replay={replay}>
                                <FormatDate key={1} />
                                <Replay key={2}/>
                            </AnimateRange>
                        </span>
                    </Col>
                </Row>
            }
            <Row style={{paddingLeft: 5 * scale, paddingRight: 5 * scale}}>
                <Col>
                    <Map cols={widget.cols} dataSet={dataSet} replay={replay}
                         dataPoint={widgetProps[0]} mode={mode} isAnimated={isAnimated}/>
                </Col>
            </Row>
            <Row style={{fontSize: 9 * scale, padding: "3%"}}>

                {severityThresholds[widgetProps[0]].map( (threshold, ix) =>
                    <Col style={{padding: 0, textAlign: "center"}} key={ix}>
                        <Color color={colors[ix]} />
                        &nbsp; {threshold}
                    </Col>
                )}

            </Row>
            <Row>
                <Col style={{textAlign: "center", fontSize: 8 * scale}}>
                    per million people
                </Col>
            </Row>
        </>
    );
    function FormatDate ({frame}) {
        const parts = dates[frame].split("/");
        return (<span>{parts[2] + "20-" + parts[0] + "-" + parts[1]}</span>);
    }
    function Replay ({frame}) {
        if (frame === dates.length - 1)
            return (
                <IconWrapperHeader color="black">
                    <CaretRightFill size={20} style={{marginTop: -4}} onClick={() => setReplay(replay + 1)}/>
                </IconWrapperHeader>
            )
        else
            return (
                <></>
            )
    }
}

const Color = ({color}) => (
    <span style={{backgroundColor: color, display: "inline-block",  width: 12, fontSize: 7, border: "1px solid black"}}>&nbsp;</span>
)

const FormatDate = ({date}) => {

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

    return (styled(World)`
          width: 100%;
          height: auto;
          ${styles} `);
};
function getStyledWorld (cols, countries, dataPoint, mode) {
    const styles = countries.filter(c => c && c.type === 'country').map( data => (
        `#${data.code} \{fill: ${colors[data[dataPoint]]}; \};`));

    return (styled(World)`
          width: 100%;
          height: auto;
          ${styles} `);
};

