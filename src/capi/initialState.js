export function upgrade(state) {  // DONT FORGET TO UPDATE THIS!!!
    if (!state.schemaVersion) {
        state.schemaVersion = 1;
        state.widgets = state.widgets.map( widget => ({...widget, props: []}))
    }
    if (state.schemaVersion < 2) {
        state.editMode = "none";
        state.schemaVersion = 2;
    }
    return state;
}
export default {
    schemaVersion: 2,
    widgetBeingConfiguredId: -1,
    editMode: "none",
    nextWidgetId: 7,
    widgets: [
        {
            id: 1,
            type: "DataForCountry",
            countries: ["My Country" ],
            row: 0, col: 0,
            rows: 1, cols: 3,
            props: ["cases", "deaths"],
        },
        {
            id: 2,
            type: "DataForCountry",
            countries: ["The Whole World"],
            row: 0,
            col: 3,
            rows: 1, cols: 3,
            props: ["deaths", "cases"],
        },
        {
            id: 3,
            type: "DataByCountry",
            countries: ["My County", "My Country",  "My State",  "The Whole World"],
            row: 1,
            col: 0,
            rows: 1, cols: 6,
            props: ["deaths", "cases", "deathsPerM", "casesPerM"],
        },
        {
            id:4,
            type: "NewCasesPerPopulationOverTime",
            countries: ["My County", "My Country",  "My State",  "The Whole World"],
            row: 0,
            col: 6,
            rows: 2, cols: 6,
            props: [],
        },
        {
            id: 5,
            type: "CasesPerPopulationOverTime",
            countries: ["My County", "My Country",  "My State",  "The Whole World"],
            row: 2,
            col: 0,
            rows: 1, cols: 4,
            props: [],
        },
        {
            id: 6,
            type: "DeathsPerPopulationOverTime",
            countries: ["My County", "My Country",  "My State",  "The Whole World"],
            row: 2,
            col: 4,
            rows: 1, cols: 4,
            props: [],
        },
        {
            id: 7,
            type: "NewDeathsPerPopulationOverTime",
            countries: ["My County", "My Country",  "My State",  "The Whole World"],
            row: 2,
            col: 8,
            rows: 1, cols: 4,
            props: [],
        },


    ]
}
