import {getURL} from "../config/urlParameters";
import {save} from "../config/localstorage";

export default {
    redactions: {
        setNameAdjusted: (name) => ({
            name: {
                set: (state, prop) => name
            }
        }),
        setCustom: () => ({
            dashboardType: {
                set: () => "custom"
            }
        }),
    },
    selectors: {
        dashboard: state => state,
        isDashboardCustom: (state) => state.dashboardType === "custom",
        name: (state) => state.name,
        link: [
            (select, {dashboard}) => select(dashboard),
            (dashboard) => getURL(dashboard)
        ],
    },
    thunks: {
        setName: ({dashboards, setNameAdjusted}) => (name) => {
            setNameAdjusted(adjustNameTillNotDuplicate(name, dashboards));
        }
    }
}
export function adjustNameTillNotDuplicate (name, dashboards) {
    while (dashboards.find(d => d.name === name)) {
        name = adjustName(name);
    }

    return name;
}
export function adjustName (name) {

    if (name.match(/\d+$/))
        name = name.replace(/(\d+)$/, (d) => d * 1 + 1)
    else
        name = name + " 2";

    return name;
}
