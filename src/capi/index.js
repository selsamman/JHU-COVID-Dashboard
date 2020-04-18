import {createAPI} from 'redux-capi';
import widgetsSpec from './widgets';
import rootSpec from "./root";
import dashboardSpec from "./dashboard";
const widgetMountPoint = {
    dashboards: {
        where: (state, item, ix) => ix === state.currentDashboardIx
    }
}
const apiSpec = [
    {
        ...rootSpec
    },
    {
        mount: widgetMountPoint,
        spec: [widgetsSpec, dashboardSpec]
    }
];
export const widgetsAPI = createAPI(apiSpec);
