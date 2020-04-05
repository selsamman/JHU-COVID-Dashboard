import * as Widgets from '../widgets';
import { VictoryTheme } from 'victory'
import { country, dates, countries} from "../data/timeseries";
import { colors} from "./colors";
import CountrySelect from "../components/CountrySelect";
import WidgetSelect from "../components/WidgetSelect";

export const scale = 1.5;

const LineGraphByCountry = (name, prop) => ({
    name: name,
    parentProps: (userConfig, isConfiguring, editWidget) => ({
        domainPadding: 20,
        theme: VictoryTheme.material,
        padding: {left: 30, top: isConfiguring? 8 : 60, right: 0, bottom: 40},
        height: isConfiguring ? 184 : 250,
        events: [{
            target: "parent",
            eventHandlers: {
                onClick: () => {editWidget();return []}
            }
        }]
    }),
    labelProps: (userConfig) => ({
        title: name,
        x: 20, y: 0, rowGutter: -12,
        style: {labels: {fontSize: 11}},
        padding: {bottom: 20},
        centerTitle: true,
        itemsPerRow: 3,
        data: userConfig.countries.map( (c, ix) => ({name: c, symbol: {fill: colors[ix]}})),
        orientation: "horizontal",
    }),
    component: Widgets.LineGraph,
    config: [
        {component: WidgetSelect, props: {}},
        {component: CountrySelect, props: {countries: countries, max: 6}},
    ],
    childProps: (userConfig, countrySelection, ix, isConfiguring) => ({
        data: country
            .find(c => c.name === countrySelection)[prop]
            .map((c, ix) => ({x: dates[ix].replace(/\/20/,'').replace(/\//, '-'), y: c}))
            .slice(dates.length - 30),
        style: {data: {stroke: colors[ix]}, tickLabels: {angle: 45}},
    }),

});

export const widgetConfig = {
    CasesByCountry: {
        name: "Cases By Country",
        component: Widgets.BarGraph,
        parentProps: (userConfig) => ({
            domainPadding: 20,
            theme: VictoryTheme.material,
        }),
        childProps: userConfig => ({
            data: country
                .filter(c => userConfig.countries.includes(c.name))
                .map(country => ({country: country.name, cases: country.casesPerM}))
                .sort((a,b) => b.cases - a.cases),
            x: "country",
            y: "cases"
        }),
        config: {source: "countries", max: 10, prop: "countries"}
    },
    CasesOverTime: LineGraphByCountry( "Total Cases", 'casesOverTime'),
    DeathsOverTime: LineGraphByCountry("Total Deaths", 'deathsOverTime'),
    CasesPerPopulationOverTime: LineGraphByCountry( "Total Cases per 1M People", 'casesPerPopulationOverTime'),
    DeathsPerPopulationOverTime: LineGraphByCountry("Total Deaths per 1M People", 'deathsPerPopulationOverTime'),
    NewCasesOverTime: LineGraphByCountry( "New Cases",'newCasesOverTime'),
    NewDeathsOverTime: LineGraphByCountry("New Deaths",'newDeathsOverTime'),
    NewCasesPerPopulationOverTime: LineGraphByCountry( "New Cases per 1M People",'newCasesPerPopulationOverTime'),
    NewDeathsPerPopulationOverTime: LineGraphByCountry("New Deaths per 1M People",'newDeathsPerPopulationOverTime'),
    NewCasesAccelerationOverTime: LineGraphByCountry( "New Cases Acceleration",'newCaseAccelerationOverTime'),
    NewDeathsAccelerationOverTime: LineGraphByCountry("New Deaths Acceleration",'newDeathAccelerationOverTime'),

    }
export const widgetNames = Object.getOwnPropertyNames(widgetConfig);
