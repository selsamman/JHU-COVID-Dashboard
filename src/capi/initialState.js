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
    schemaVersion: 6,
    widgetBeingConfiguredId: -1,
    editMode: "none",
    currentDashboardIx: 0,
    currentDashboardName: defaultDashboardName,
    locationStatus: "init",
    substitutionCountries: {
        "My Country": "United States",
        "Selected Location": "United States"
    },
    "dashboards": [
        {
            "nextWidgetId": 115,
            "dashboardType": "stock",
            "name": "COVID Dashboard",
            "widgets": [{
                "id": 1,
                "type": "DataForCountry",
                "countries": ["Selected Location"],
                "row": 0,
                "col": 0,
                "rows": 1,
                "cols": 6,
                "props": ["cases", "deaths", "caseTrend", "deathTrend"]
            }, {
                "id": 3,
                "type": "DataByCountry",
                "countries": ["My County", "My Country", "My State", "The Whole World", "Spain", "Italy", "France", "Germany", "United Kingdom", "Belgium", "United States", "South Korea", "Sweden", "Ireland"],
                "row": 0,
                "col": 6,
                "rows": 2,
                "cols": 6,
                "props": ["casesPerM", "deathsPerM", "deathTrend", "caseTrend"],
                "displayCount": 10,
                "sortUp": false,
                "allData": false,
                "selectCountry": true
            }, {
                "id": 4,
                "type": "NewCasesOverTime",
                "countries": ["Selected Location"],
                "row": 1,
                "col": 0,
                "rows": 1,
                "cols": 6,
                "props": ["mortalitySeverityOverTime"]
            }, {
                "id": 5,
                "type": "NewDeathsOverTime",
                "countries": ["Selected Location"],
                "row": 2,
                "col": 0,
                "rows": 1,
                "cols": 6,
                "props": []
            }, {
                "id": 6,
                "type": "DataAllCountries",
                "countries": ["My County", "My Country", "My State", "The Whole World"],
                "row": 2,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["deathsPerM", "casesPerM", "newDeaths", "newCases"],
                "displayCount": 50,
                "scroll": true
            }, {
                "id": 105,
                "type": "Blank",
                "row": 3,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": ["cases", "deaths", "caseTrend", "deathTrend"],
                "countries": ["The Whole World"]
            }, {
                "id": 113,
                "type": "Blank",
                "row": 3,
                "col": 5,
                "rows": 1,
                "cols": 7,
                "props": ["cases", "deaths"],
                "countries": ["My Country"]
            }],
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "New Cases",
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
            ],
        },
        {
            "nextWidgetId": 8,
            "dashboardType": "stock",
            "name": "New Deaths",
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
            ],
        },
        {
            "nextWidgetId": 10,
            "dashboardType": "stock",
            "name": "Animation Over Time",
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
                },                {
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
            "nextWidgetId": 6,
            "dashboardType": "stock",
            "name": "Case Mortality",
            "widgets": [
                {
                    "id": 1,
                    "type": "DataAllCountries",
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
                        "My Country",
                        "Selected Location"
                    ]
                }
            ],
        },
        {
            "nextWidgetId": 7,
            "dashboardType": "stock",
            "name": "US State and Counties",
            "widgets": [{
                "id": 1,
                "type": "DataByCountry",
                "row": 0,
                "col": 0,
                "rows": 1,
                "cols": 6,
                "props": ["caseTrend", "deathTrend", "casesPerM", "deathsPerM"],
                "countries": ["United States"],
                "includeCounties": false,
                "includeStates": true,
                "selectCountry": true,
                "scroll": true
            }, {
                "id": 3,
                "type": "NewCasesOverTime",
                "row": 0,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["cases", "deaths"],
                "countries": ["Selected Location"]
            }, {
                "id": 4,
                "type": "DataByCountry",
                "row": 1,
                "col": 0,
                "rows": 1,
                "cols": 6,
                "props": ["caseTrend", "deathTrend", "cases", "deaths"],
                "countries": ["Selected Location"],
                "includeCounties": true,
                "selectCountry": true,
                "scroll": true
            }, {
                "id": 6,
                "type": "NewDeathsOverTime",
                "row": 1,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["cases", "deaths"],
                "countries": ["Selected Location"]
            }],
        },
        {
            "nextWidgetId": 13,
            "dashboardType": "stock",
            "name": "COVID Mortality vs Other Causes",
            "widgets": [{
                "id": 1,
                "type": "DataAllCountries",
                "row": 0,
                "col": 0,
                "rows": 4,
                "cols": 6,
                "props": ["deathsPerM", "deaths", "deathsAsPercentOfFlu", "deathsAsPercentOfOverall"],
                "countries": ["My Country"],
                "includeCounties": true,
                "includeStates": true,
                "selectCountry": false,
                "displayCount": 100,
                "scroll": true
            }, {
                "id": 3,
                "type": "DataForCountry",
                "row": 0,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["deathsPerM", "deaths", "deathsAsPercentOfOverall", "deathsAsPercentOfFlu"],
                "countries": ["The Whole World"]
            }, {
                "id": 4,
                "type": "DataForCountry",
                "row": 3,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["deathsPerM", "deaths", "deathsAsPercentOfFlu", "deathsAsPercentOfOverall"],
                "countries": ["My County"]
            }, {
                "id": 8,
                "type": "DataForCountry",
                "row": 1,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["deathsPerM", "deaths", "deathsAsPercentOfFlu", "deathsAsPercentOfOverall"],
                "countries": ["My Country"]
            }, {
                "id": 11,
                "type": "DataForCountry",
                "row": 2,
                "col": 6,
                "rows": 1,
                "cols": 6,
                "props": ["deathsPerM", "deaths", "deathsAsPercentOfFlu", "deathsAsPercentOfOverall"],
                "countries": ["My State"]
            }]
        }
    ],
}
export default initialState;
