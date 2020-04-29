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
            "nextWidgetId": 112,
            "dashboardType": "stock",
            "name": "COVID Dashboard",
            "widgets": [{
                "id": 1,
                "type": "DataForCountry",
                "countries": ["My Country"],
                "row": 0,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": ["cases", "deaths", "caseTrend", "deathTrend"]
            }, {
                "id": 3,
                "type": "DataByCountry",
                "countries": ["My County", "My Country", "My State", "The Whole World", "Spain", "Italy", "France", "Germany", "United Kingdom", "Belgium", "Turkey", "United States", "South Korea", "Iran", "Sweden", "Ireland"],
                "row": 0,
                "col": 5,
                "rows": 2,
                "cols": 7,
                "props": ["casesPerM", "deathsPerM", "deathTrend", "caseTrend"],
                "displayCount": 10,
                "sortUp": false,
                "allData": false
            }, {
                "id": 4,
                "type": "NewCasesOverTime",
                "countries": ["My Country"],
                "row": 1,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": ["mortalitySeverityOverTime"]
            }, {
                "id": 5,
                "type": "NewDeathsOverTime",
                "countries": ["My Country"],
                "row": 2,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": []
            }, {
                "id": 6,
                "type": "DataAllCountries",
                "countries": ["My County", "My Country", "My State", "The Whole World"],
                "row": 2,
                "col": 5,
                "rows": 2,
                "cols": 7,
                "props": ["deathsPerM", "casesPerM", "newDeaths", "newCases"],
                "displayCount": 15
            }, {
                "id": 105,
                "type": "Blank",
                "row": 3,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": ["cases", "deaths", "caseTrend", "deathTrend"],
                "countries": ["The Whole World"]
            }]
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
    ],
}
export default initialState;
