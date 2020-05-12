import React from 'react';
import {widgetsAPI} from "../capi";
import {Row, Col} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";

const SingleCountrySelect = ({id, scale, countries}) => {
    const {widget, dataSet, addSingleCountryToWidget} = widgetsAPI({id: id}, SingleCountrySelect);
    return (
        <div>
            <Row>
                 <Col>
                    <CountryDropDown
                        scale={scale}
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

const CountryDropDown = ({countries, onSelect, country, scale}) => (
    <Typeahead
        bsSize="small"
        id="country"
        placeholder={country}
        onChange={onSelect}
        options={countries} />
);

export default SingleCountrySelect;
