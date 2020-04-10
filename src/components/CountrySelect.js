import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {widgetsAPI} from "../capi";
import {widgetConfig} from "../config/widgets";
import {Row, Col, Button, Dropdown, DropdownButton, Container} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {colors} from "../config/colors";
import { XCircleFill, PlusCircleFill } from 'react-bootstrap-icons';

export default ({id, countries, max, scale}) => {
    const {widget, addCountryToWidget, deleteCountryFromWidget} = widgetsAPI({id: id});
    const {selectedCountry, selectCountry} = useState(null);
    const [addingCounties, setAddingCountries] = useState(false);
    return (
        <div>
            <Row>
                <Col xs={2}>
                    {(!addingCounties && widget.countries.length < max) &&
                        <PlusCircleFill size={16 * scale} onClick={()=>setAddingCountries(true)} />}
                    {addingCounties &&
                    <XCircleFill size={16 * scale} onClick={()=>setAddingCountries(false)} />}
                </Col>
                <Col xs={10}>
                    {addingCounties &&
                        <Row>
                            <Col>
                                <CountryDropDown
                                    scale={scale}
                                    countries={countries}
                                    onSelect={(selectedCountry) => {
                                        addCountryToWidget(selectedCountry[0]);
                                        setAddingCountries(false);
                                    }} />
                            </Col>
                        </Row>}
                    {!addingCounties &&
                        <Row style={{padding: 0}}>
                            {widget.countries.map( (c, ix) =>
                                <SelectedCountry key={ix} ix={ix} country={c} onDelete={deleteCountryFromWidget} scale={scale}/>)}
                        </Row>}
                    </Col>
            </Row>
        </div>
    );
};

const CountryDropDown = ({countries, onSelect}) => (
    <Typeahead
        bsSize="small"
        id="country"
        placeholder="Enter Country to add"
        onChange={onSelect}
        options={countries} />
);

const SelectedCountry = ({country, onDelete, ix, scale}) => (

    <Col md={4} xs={4} lg={4} style={{padding: 0, lineHeight: 1.2 * scale}}>
        <XCircleFill size={11 * scale} color={colors[ix]} onClick={() => onDelete(country)} />
        &nbsp;
        <span style={{fontSize: 10 * scale}}>{country}</span>
    </Col>
);
