import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {widgetsAPI} from "../capi";
import {widgetConfig} from "../config/widgets";
import {Row, Col, Button, Dropdown, DropdownButton, Container} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {colors} from "../config/colors";
import { XCircleFill, PlusCircleFill } from 'react-bootstrap-icons';
import {scale} from "../config/widgets";

export default ({id, countries, max}) => {
    const {widget, addCountryToWidget, addSingleCountryToWidget} = widgetsAPI({id: id});
    return (
        <div>
            <Row>
                 <Col>
                    <CountryDropDown
                        countries={countries}
                        country={widget.countries[0]}
                        onSelect={(selectedCountry) => {
                            addSingleCountryToWidget(selectedCountry[0]);
                        }} />
                </Col>
            </Row>
        </div>
    );
};

const CountryDropDown = ({countries, onSelect, country}) => (
    <Typeahead
        size={scale === 1 ? "small" : "large"}
        id="country"
        placeholder={country}
        onChange={onSelect}
        options={countries} />
);
