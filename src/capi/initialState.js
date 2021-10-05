export function upgrade(state) {  // DONT FORGET TO UPDATE THIS!!!
    if (state.schemaVersion < 3) {
        state = initialState;
    }
    if (state.schemaVersion < 5) {
        state.currentDashboardName =  state.dashboards[0].name;
        state.currentDashboardIx = 0;
        delete state.substitutionCountries.substitutionCountries;
        delete state.currentDashBoardName;
        state.schemaVersion = 5;
        console.log("Upgrading to schema version " + 4);
    }
    if (state.schemaVersion < 6) {
        state.substitutionCountries["Selected Location"] = "United States";
        state.schemaVersion = 6;
        console.log("Upgrading to schema version " + 6);
    }
    if (state.schemaVersion < 7) {
        state.dashboards.map(d => {d.toDate = 0});
        state.schemaVersion = 7;
        console.log("Upgrading to schema version " + 6);
    }
    return state;
}
export const defaultDashboardName = "COVID Dashboard";
export const initialWidget = {
    id: 1,
    type: "DataByCountry",
    row: 0, col: 0,
    rows: 1, cols: 6,
    props: ["cases", "deaths"],
    countries: ["My Country"],
}
export const initialDashboard = {
    nextWidgetId: 4,
    dashboardType: "custom",
    name: "My " + defaultDashboardName,
    widgets: [
        {...initialWidget},
        {...initialWidget, id: 3, col: 6, type: "Blank"}
    ]
}
const initialState = {
    "schemaVersion": 7,
    "widgetBeingConfiguredId": 1,
    "editMode": "none",
    "currentDashboardIx": 23,
    "currentDashboardName": "My United States Vaccinations",
    "locationStatus": "fetched",
    "substitutionCountries": {
        "My Country": "United States",
        "My County": "Dutchess, New York",
        "My State": "New York"
    },
    "dashboards": [
        {
            "nextWidgetId": 115,
            "dashboardType": "stock",
            "name": "COVID Dashboard",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataForCountry",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ]
                },
                {
                    "id": 3,
                    "type": "DataByCountry",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World",
                        "Spain",
                        "Italy",
                        "France",
                        "Chile",
                        "United Kingdom",
                        "Belgium",
                        "United States",
                        "Brazil",
                        "Sweden",
                        "Ireland",
                        "Peru"
                    ],
                    "row": 0,
                    "col": 6,
                    "rows": 2,
                    "cols": 6,
                    "props": [
                        "casesPerM",
                        "deathsPerM",
                        "deathTrend",
                        "caseTrend"
                    ],
                    "displayCount": 10,
                    "sortUp": false,
                    "allData": false,
                    "selectCountry": true
                },
                {
                    "id": 4,
                    "type": "NewCasesOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "mortalitySeverityOverTime"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "NewDeathsOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 2,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [],
                    "granularity": "weekly"
                },
                {
                    "id": 6,
                    "type": "DataAllCountries",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World"
                    ],
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "casesPerM",
                        "newDeaths",
                        "newCases"
                    ],
                    "displayCount": 50,
                    "scroll": true,
                    "newPerWeek": true
                },
                {
                    "id": 105,
                    "type": "Blank",
                    "row": 3,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 113,
                    "type": "Blank",
                    "row": 3,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "New Cases",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "newCasesPerPopulation",
                        "caseTrend",
                        "casesPerM",
                        "deathsPerM"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "selectCountry": true,
                    "includeStates": false,
                    "includeCounties": false,
                    "displayCount": 30
                },
                {
                    "id": 3,
                    "type": "NewCasesOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 4,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "casesPerM",
                        "deathsPerM",
                        "newCases",
                        "newDeaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "countries": [
                        "Selected Location",
                        "Selected Location",
                        "United States"
                    ]
                },
                {
                    "id": 6,
                    "type": "CasesPerPopulationOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country",
                        "Selected Location"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "New Deaths",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "newDeathsPerPopulation",
                        "deathTrend",
                        "deathsPerM",
                        "casesPerM"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 30,
                    "selectCountry": true
                },
                {
                    "id": 3,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deaths",
                        "cases",
                        "deathsPerM",
                        "casesPerM",
                        "newDeathsPerPopulation",
                        "newCasesPerPopulation",
                        "deathTrend",
                        "caseTrend"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 4,
                    "type": "NewDeathsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 6,
                    "type": "DeathsPerPopulationOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country",
                        "Selected Location"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 10,
            "dashboardType": "stock",
            "name": "Animation Over Time",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "WorldMap",
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "caseSeverityOverTime",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 3,
                    "type": "WorldMap",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 6,
                    "type": "Blank",
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 4,
                    "type": "CasesOverTime",
                    "row": 1,
                    "col": 1,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 7,
                    "type": "Blank",
                    "row": 1,
                    "col": 5,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 5,
                    "type": "DeathsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "Case Mortality",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "caseMortality",
                        "deaths",
                        "cases"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 30,
                    "selectCountry": true
                },
                {
                    "id": 3,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deaths",
                        "cases",
                        "deathsPerM",
                        "casesPerM",
                        "newDeaths",
                        "newCases",
                        "deathTrend",
                        "caseTrend"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 4,
                    "type": "CaseMortalityOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 7,
                    "type": "NewCaseMortalityOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                }
            ],
            "selectedLocation": "United States",
            "selectedCountry": "United States"
        },
        {
            "nextWidgetId": 7,
            "dashboardType": "stock",
            "name": "US State and Counties",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "caseTrend",
                        "deathTrend",
                        "casesPerM",
                        "deathsPerM"
                    ],
                    "countries": [
                        "United States"
                    ],
                    "includeCounties": false,
                    "includeStates": true,
                    "selectCountry": true,
                    "scroll": true
                },
                {
                    "id": 3,
                    "type": "NewCasesOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 4,
                    "type": "DataByCountry",
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "caseTrend",
                        "deathTrend",
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "includeCounties": true,
                    "selectCountry": true,
                    "scroll": true
                },
                {
                    "id": 6,
                    "type": "NewDeathsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 13,
            "dashboardType": "stock",
            "name": "COVID Mortality vs Other Causes",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 4,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "deaths",
                        "deathsAsPercentOfFlu",
                        "deathsAsPercentOfOverall"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "includeCounties": true,
                    "includeStates": true,
                    "selectCountry": false,
                    "displayCount": 100,
                    "scroll": true
                },
                {
                    "id": 3,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "deaths",
                        "deathsAsPercentOfOverall",
                        "deathsAsPercentOfFlu"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 4,
                    "type": "DataForCountry",
                    "row": 3,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "deaths",
                        "deathsAsPercentOfFlu",
                        "deathsAsPercentOfOverall"
                    ],
                    "countries": [
                        "My County"
                    ]
                },
                {
                    "id": 8,
                    "type": "DataForCountry",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "deaths",
                        "deathsAsPercentOfFlu",
                        "deathsAsPercentOfOverall"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 11,
                    "type": "DataForCountry",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "deaths",
                        "deathsAsPercentOfFlu",
                        "deathsAsPercentOfOverall"
                    ],
                    "countries": [
                        "My State"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 113,
            "dashboardType": "stock",
            "name": "Select a Time Period",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataForCountry",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 3,
                    "type": "DataByCountry",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World",
                        "Spain",
                        "Italy",
                        "France",
                        "Germany",
                        "United Kingdom",
                        "Belgium",
                        "United States",
                        "South Korea",
                        "Sweden",
                        "Ireland"
                    ],
                    "row": 0,
                    "col": 5,
                    "rows": 2,
                    "cols": 7,
                    "props": [
                        "casesPerM",
                        "caseTrend",
                        "cases",
                        "newCases"
                    ],
                    "displayCount": 50,
                    "sortUp": false,
                    "allData": false,
                    "selectCountry": true,
                    "dateSelect": "dateSlider",
                    "includeCounties": false,
                    "includeStates": false,
                    "scroll": false
                },
                {
                    "id": 4,
                    "type": "NewCasesOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "mortalitySeverityOverTime"
                    ],
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 5,
                    "type": "NewDeathsOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 2,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [],
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 6,
                    "type": "DataAllCountries",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World"
                    ],
                    "row": 2,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "deathsPerM",
                        "deathTrend",
                        "deaths",
                        "newDeaths"
                    ],
                    "displayCount": 50,
                    "includeCounties": true,
                    "includeStates": true,
                    "scroll": true,
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 105,
                    "type": "Blank",
                    "row": 3,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 112,
                    "type": "Blank",
                    "row": 3,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "The Whole World",
            "selectedCountry": "The Whole World",
            "selectedState": "New York"
        },
        {
            "nextWidgetId": 6,
            "dashboardType": "custom",
            "name": "Case Mortality Rates by State",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 2,
                    "cols": 6,
                    "props": [
                        "caseMortality",
                        "deaths",
                        "cases"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 20,
                    "selectCountry": true,
                    "includeStates": true,
                    "sortUp": true
                },
                {
                    "id": 3,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deaths",
                        "cases",
                        "deathsPerM",
                        "casesPerM",
                        "newDeaths",
                        "newCases",
                        "deathTrend",
                        "caseTrend"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 4,
                    "type": "CaseMortalityOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country",
                        "Selected Location"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 7,
            "dashboardType": "custom",
            "name": "Cases by State Weekly Trend",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 2,
                    "cols": 6,
                    "props": [
                        "caseTrend",
                        "deathTrend",
                        "casesPerM",
                        "deathsPerM",
                        "newCasesPerPopulation"
                    ],
                    "countries": [
                        "United States"
                    ],
                    "includeCounties": false,
                    "includeStates": true,
                    "selectCountry": true,
                    "scroll": true
                },
                {
                    "id": 3,
                    "type": "NewCasesPerPopulationOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 6,
                    "type": "NewDeathsPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                }
            ],
            "selectedLocation": "Alabama",
            "selectedState": "Alabama"
        },
        {
            "nextWidgetId": 7,
            "dashboardType": "custom",
            "name": "My US State and Counties",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "caseTrend",
                        "deathTrend",
                        "casesPerM",
                        "deathsPerM"
                    ],
                    "countries": [
                        "United States"
                    ],
                    "includeCounties": false,
                    "includeStates": true,
                    "selectCountry": true,
                    "scroll": true
                },
                {
                    "id": 3,
                    "type": "NewCasesPerPopulationOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 4,
                    "type": "DataByCountry",
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "caseTrend",
                        "deathTrend",
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "includeCounties": true,
                    "selectCountry": true,
                    "scroll": true
                },
                {
                    "id": 6,
                    "type": "NewDeathsPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                }
            ],
            "selectedLocation": "Delaware",
            "selectedState": "Delaware",
            "selectedCountry": "United States"
        },
        {
            "nextWidgetId": 115,
            "dashboardType": "custom",
            "name": "My COVID Dashboard 1",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataForCountry",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ]
                },
                {
                    "id": 3,
                    "type": "DataByCountry",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World",
                        "Spain",
                        "Italy",
                        "France",
                        "Germany",
                        "United Kingdom",
                        "Belgium",
                        "United States",
                        "South Korea",
                        "Sweden",
                        "Ireland",
                        "Canada"
                    ],
                    "row": 0,
                    "col": 6,
                    "rows": 2,
                    "cols": 6,
                    "props": [
                        "casesPerM",
                        "deathsPerM",
                        "deathTrend",
                        "caseTrend"
                    ],
                    "displayCount": 10,
                    "sortUp": false,
                    "allData": false,
                    "selectCountry": true
                },
                {
                    "id": 4,
                    "type": "NewCasesOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "mortalitySeverityOverTime"
                    ]
                },
                {
                    "id": 5,
                    "type": "NewDeathsOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 2,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": []
                },
                {
                    "id": 6,
                    "type": "DataAllCountries",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World"
                    ],
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "casesPerM",
                        "newDeaths",
                        "newCases"
                    ],
                    "displayCount": 10,
                    "scroll": true,
                    "allData": false
                },
                {
                    "id": 105,
                    "type": "Blank",
                    "row": 3,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 113,
                    "type": "Blank",
                    "row": 3,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "United States",
            "selectedCountry": "United States"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "United States Testing",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "caseTrend",
                        "testTrend",
                        "casesPerM",
                        "testsPerM"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 100,
                    "scroll": true,
                    "selectCountry": true,
                    "includeStates": true,
                    "includeCounties": false,
                    "newPerWeek": true
                },
                {
                    "id": 3,
                    "type": "NewTestsOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "PositiveTestsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 7,
                    "type": "Blank",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "United States",
            "selectedCountry": "United States",
            "selectedState": "United States"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "Global Testing",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "newTests",
                        "newTestsPerPopulation",
                        "testsPerM",
                        "caseTrend"
                    ],
                    "countries": [
                        "My Country",
                        "United States",
                        "Russia",
                        "United Kingdom",
                        "Germany",
                        "South Korea",
                        "Sweden",
                        "Peru",
                        "Canada",
                        "Belgium",
                        "Spain",
                        "Italy",
                        "Singapore",
                        "France"
                    ],
                    "displayCount": 100,
                    "scroll": true,
                    "selectCountry": true,
                    "includeStates": false,
                    "includeCounties": false,
                    "newPerWeek": true
                },
                {
                    "id": 3,
                    "type": "NewTestsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "tests",
                        "caseMortality",
                        "newCasesPerPopulation",
                        "newDeathsPerPopulation",
                        "newTestsPerPopulation",
                        "deathTrend"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly",
                    "newPerWeek": true
                },
                {
                    "id": 7,
                    "type": "PositiveTestsOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                }
            ],
            "selectedLocation": "United States",
            "selectedCountry": "United States",
            "selectedState": "Guam"
        },
        {
            "nextWidgetId": 113,
            "dashboardType": "custom",
            "name": "My Select a Time Period",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataForCountry",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 3,
                    "type": "DataByCountry",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World",
                        "Spain",
                        "Italy",
                        "France",
                        "Germany",
                        "United Kingdom",
                        "Belgium",
                        "United States",
                        "Sweden",
                        "Ireland",
                        "Texas",
                        "Florida"
                    ],
                    "row": 0,
                    "col": 5,
                    "rows": 2,
                    "cols": 7,
                    "props": [
                        "casesPerM",
                        "caseTrend",
                        "cases",
                        "newCasesPerPopulation"
                    ],
                    "displayCount": 50,
                    "sortUp": false,
                    "allData": false,
                    "selectCountry": true,
                    "dateSelect": "dateSlider",
                    "includeCounties": false,
                    "includeStates": false,
                    "scroll": false
                },
                {
                    "id": 4,
                    "type": "NewCasesOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "mortalitySeverityOverTime"
                    ],
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 5,
                    "type": "NewDeathsOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 2,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [],
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 6,
                    "type": "DataAllCountries",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World"
                    ],
                    "row": 2,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "deathsPerM",
                        "deathTrend",
                        "deaths",
                        "newDeaths"
                    ],
                    "displayCount": 50,
                    "includeCounties": true,
                    "includeStates": true,
                    "scroll": true,
                    "dateSelect": "dateSlider"
                },
                {
                    "id": 105,
                    "type": "Blank",
                    "row": 3,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 112,
                    "type": "Blank",
                    "row": 3,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "Florida",
            "selectedCountry": "The Whole World",
            "selectedState": "Florida"
        },
        {
            "nextWidgetId": 119,
            "dashboardType": "custom",
            "name": "US vs Europe",
            "toDate": 0,
            "widgets": [
                {
                    "id": 3,
                    "type": "NewCasesPerPopulationOverTime",
                    "countries": [
                        "Spain",
                        "Italy",
                        "France",
                        "United States",
                        "United Kingdom",
                        "Germany"
                    ],
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 8,
                    "props": [
                        "newCasesPerPopulation",
                        "newDeathsPerPopulation",
                        "casesPerM",
                        "deathsPerM"
                    ],
                    "displayCount": 10,
                    "sortUp": false,
                    "allData": false,
                    "selectCountry": true,
                    "newPerWeek": false,
                    "granularity": "weekly"
                },
                {
                    "id": 4,
                    "type": "DataByCountry",
                    "countries": [
                        "Spain",
                        "United States",
                        "France",
                        "United Kingdom",
                        "Italy",
                        "Germany"
                    ],
                    "row": 1,
                    "col": 8,
                    "rows": 1,
                    "cols": 4,
                    "props": [
                        "mortalitySeverityOverTime",
                        "deathsPerM",
                        "newDeathsPerPopulation",
                        "caseMortality"
                    ],
                    "granularity": "weekly",
                    "newPerWeek": true
                },
                {
                    "id": 5,
                    "type": "Blank",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 2,
                    "col": 0,
                    "rows": 1,
                    "cols": 12,
                    "props": [],
                    "granularity": "weekly"
                },
                {
                    "id": 113,
                    "type": "Blank",
                    "row": 3,
                    "col": 0,
                    "rows": 1,
                    "cols": 12,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 115,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 8,
                    "rows": 1,
                    "cols": 4,
                    "props": [
                        "casesPerM",
                        "newCasesPerPopulation",
                        "testsPerM",
                        "newTestsPerPopulation"
                    ],
                    "countries": [
                        "United States",
                        "Spain",
                        "Germany",
                        "Italy",
                        "United Kingdom",
                        "France"
                    ],
                    "newPerWeek": true
                },
                {
                    "id": 117,
                    "type": "NewDeathsPerPopulationOverTime",
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 8,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "France",
                        "Italy",
                        "Germany",
                        "United Kingdom",
                        "United States",
                        "Spain"
                    ],
                    "granularity": "weekly",
                    "newPerWeek": true
                }
            ],
            "selectedLocation": "Ireland",
            "selectedCountry": "Ireland",
            "selectedState": "New York"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "custom",
            "name": "My Global Testing",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "newTestsPerPopulation",
                        "newTests",
                        "testsPerM",
                        "caseTrend"
                    ],
                    "countries": [
                        "My Country",
                        "United States",
                        "Russia",
                        "United Kingdom",
                        "Germany",
                        "South Korea",
                        "Sweden",
                        "Peru",
                        "Canada",
                        "Belgium",
                        "Spain",
                        "Italy",
                        "Singapore",
                        "France"
                    ],
                    "displayCount": 100,
                    "scroll": true,
                    "selectCountry": true,
                    "includeStates": false,
                    "includeCounties": false,
                    "newPerWeek": true
                },
                {
                    "id": 3,
                    "type": "NewTestsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "tests",
                        "caseMortality",
                        "newCasesPerPopulation",
                        "newDeathsPerPopulation",
                        "newTestsPerPopulation",
                        "deathTrend"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly",
                    "newPerWeek": true
                },
                {
                    "id": 7,
                    "type": "PositiveTestsOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                }
            ],
            "selectedLocation": "United States",
            "selectedCountry": "United States",
            "selectedState": "Guam"
        },
        {
            "nextWidgetId": 11,
            "dashboardType": "stock",
            "name": "Vaccination Leaders",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "vaccinationsPerM",
                        "vaccinations",
                        "vaccinationTrend",
                        "caseTrend"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "allData": true,
                    "displayCount": 20,
                    "selectCountry": true
                },
                {
                    "id": 3,
                    "type": "CasesPerPopulationOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 4,
                    "type": "VaccinationsPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 6,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "casesPerM",
                        "deathsPerM",
                        "vaccinationsPerM",
                        "vaccinations"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 8,
                    "type": "Blank",
                    "row": 0,
                    "col": 11,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 9,
                    "type": "Blank",
                    "row": 1,
                    "col": 11,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 10,
                    "type": "Blank",
                    "row": 2,
                    "col": 11,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "Seychelles",
            "selectedCountry": "Seychelles"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "Global Vaccinations ",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "vaccinationsPerM",
                        "vaccinations",
                        "vaccinationTrend",
                        "daysToHerd"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 100,
                    "scroll": true,
                    "selectCountry": true,
                    "includeStates": false,
                    "includeCounties": false,
                    "newPerWeek": true
                },
                {
                    "id": 3,
                    "type": "VaccinationsOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "vaccinations",
                        "caseMortality",
                        "newCasesPerPopulation",
                        "newDeathsPerPopulation",
                        "vaccinationsPerM",
                        "deathTrend"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly",
                    "newPerWeek": true
                },
                {
                    "id": 7,
                    "type": "VaccinationsPerPopulationOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location",
                        "My Country",
                        "My State",
                        "The Whole World"
                    ],
                    "granularity": "weekly"
                }
            ],
            "selectedLocation": "United Kingdom",
            "selectedCountry": "United Kingdom",
            "selectedState": "Guam"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "United States Vaccinations",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "vaccinationsPerM",
                        "vaccinationTrend",
                        "vaccinations",
                        "daysToHerd"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 100,
                    "scroll": true,
                    "selectCountry": true,
                    "includeStates": true,
                    "includeCounties": false,
                    "newPerWeek": true
                },
                {
                    "id": 3,
                    "type": "VaccinationsOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "daily"
                },
                {
                    "id": 5,
                    "type": "VaccinationsPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location",
                        "United States",
                        "The Whole World",
                        "My State",
                        "My Country"
                    ],
                    "granularity": "daily"
                },
                {
                    "id": 7,
                    "type": "Blank",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "Puerto Rico",
            "selectedCountry": "United States",
            "selectedState": "Puerto Rico"
        },
        {
            "nextWidgetId": 115,
            "dashboardType": "custom",
            "name": "My COVID Dashboard",
            "toDate": 0,
            "widgets": [
                {
                    "id": 1,
                    "type": "DataForCountry",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 0,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ]
                },
                {
                    "id": 3,
                    "type": "DataByCountry",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World",
                        "Spain",
                        "Italy",
                        "France",
                        "Chile",
                        "United Kingdom",
                        "Belgium",
                        "United States",
                        "Brazil",
                        "Sweden",
                        "Ireland",
                        "Peru"
                    ],
                    "row": 0,
                    "col": 6,
                    "rows": 2,
                    "cols": 6,
                    "props": [
                        "casesPerM",
                        "deathsPerM",
                        "deathTrend",
                        "caseTrend"
                    ],
                    "displayCount": 10,
                    "sortUp": false,
                    "allData": false,
                    "selectCountry": true
                },
                {
                    "id": 4,
                    "type": "NewCasesOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 1,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "mortalitySeverityOverTime"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "NewDeathsOverTime",
                    "countries": [
                        "Selected Location"
                    ],
                    "row": 2,
                    "col": 0,
                    "rows": 1,
                    "cols": 6,
                    "props": [],
                    "granularity": "weekly"
                },
                {
                    "id": 6,
                    "type": "DataAllCountries",
                    "countries": [
                        "My County",
                        "My Country",
                        "My State",
                        "The Whole World"
                    ],
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "deathsPerM",
                        "casesPerM",
                        "newDeaths",
                        "newCases"
                    ],
                    "displayCount": 50,
                    "scroll": true,
                    "newPerWeek": true
                },
                {
                    "id": 105,
                    "type": "Blank",
                    "row": 3,
                    "col": 0,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths",
                        "caseTrend",
                        "deathTrend"
                    ],
                    "countries": [
                        "The Whole World"
                    ]
                },
                {
                    "id": 113,
                    "type": "Blank",
                    "row": 3,
                    "col": 5,
                    "rows": 1,
                    "cols": 7,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ]
        },
        {
            "nextWidgetId": 11,
            "dashboardType": "custom",
            "name": "My Vaccination Leaders",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "vaccinationsPerM",
                        "vaccinations",
                        "vaccinationTrend",
                        "caseTrend"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "allData": true,
                    "displayCount": 20,
                    "selectCountry": true
                },
                {
                    "id": 3,
                    "type": "NewCasesPerPopulationOverTime",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 4,
                    "type": "VaccinationsPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "daily"
                },
                {
                    "id": 6,
                    "type": "DataForCountry",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 5,
                    "props": [
                        "casesPerM",
                        "deathsPerM",
                        "vaccinationsPerM",
                        "vaccinations"
                    ],
                    "countries": [
                        "Selected Location"
                    ]
                },
                {
                    "id": 8,
                    "type": "Blank",
                    "row": 0,
                    "col": 11,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 9,
                    "type": "Blank",
                    "row": 1,
                    "col": 11,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                },
                {
                    "id": 10,
                    "type": "Blank",
                    "row": 2,
                    "col": 11,
                    "rows": 1,
                    "cols": 1,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "Cayman Islands",
            "selectedCountry": "Cayman Islands"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "custom",
            "name": "US Vaccinations",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "vaccinationsPerM",
                        "caseTrend",
                        "newCasesPerPopulation",
                        "newDeathsPerPopulation",
                        "daysToHerd"
                    ],
                    "countries": [
                        "United States"
                    ],
                    "includeStates": true,
                    "includeCounties": false,
                    "newPerWeek": true,
                    "scroll": true,
                    "selectCountry": true
                },
                {
                    "id": 3,
                    "type": "VaccinationsPerPopulationOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 5,
                    "type": "NewCasesPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "weekly"
                },
                {
                    "id": 7,
                    "type": "Blank",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "Utah",
            "selectedState": "Utah"
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "custom",
            "name": "My United States Vaccinations",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataByCountry",
                    "row": 0,
                    "col": 0,
                    "rows": 3,
                    "cols": 6,
                    "props": [
                        "vaccinationTrend",
                        "vaccinations",
                        "daysToHerd",
                        "vaccinationsPerM"
                    ],
                    "countries": [
                        "My Country"
                    ],
                    "displayCount": 100,
                    "scroll": true,
                    "selectCountry": true,
                    "includeStates": true,
                    "includeCounties": false,
                    "newPerWeek": true
                },
                {
                    "id": 3,
                    "type": "VaccinationsOverTime",
                    "row": 0,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location"
                    ],
                    "granularity": "daily"
                },
                {
                    "id": 5,
                    "type": "VaccinationsPerPopulationOverTime",
                    "row": 1,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "Selected Location",
                        "United States",
                        "The Whole World",
                        "My State",
                        "My Country"
                    ],
                    "granularity": "daily"
                },
                {
                    "id": 7,
                    "type": "Blank",
                    "row": 2,
                    "col": 6,
                    "rows": 1,
                    "cols": 6,
                    "props": [
                        "cases",
                        "deaths"
                    ],
                    "countries": [
                        "My Country"
                    ]
                }
            ],
            "selectedLocation": "Puerto Rico",
            "selectedCountry": "United States",
            "selectedState": "Puerto Rico"
        }
    ],
    "newDashboards": false,
    "startupSequence": "done"
}
export default initialState;
