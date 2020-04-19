import {dataSet} from "../data/timeseries";
import bent from "bent";

export async function manageLocation (api) {

    const {fetchLocation, locationInit, setLocationNeeded, cunt} = api;
    const hasLongLat = (new URLSearchParams(document.location.search)).get("long") &&
                        (new URLSearchParams(document.location.search)).get("lat")
    if (fetchLocation || hasLongLat)
        await updateLocation(api);
    else if (locationInit) {
        console.log("Will ask for location in 5 seconds");
        setTimeout(() => {

            setLocationNeeded();
            console.log("Asking for location now");
        }, 5000)
    }

}
export async function updateLocation(api) {
    const {setLocationDenied, setLocationFetched, substituteCountry, persistState} = api;
    const rawLocation = await getLocationData();
    if (rawLocation) {
        console.log(JSON.stringify(rawLocation))
        const location = {
            country: rawLocation.countryName,
            state: rawLocation.principalSubdivision,
        }
        rawLocation.localityInfo.administrative.map(o => {
            if (o.name.match(/county/i))
                location.county = o.name.replace(/ county/i, '') + ', ' + rawLocation.principalSubdivision;
        });
        adjustDataSetForLocation(location, api);
        setLocationFetched();
        persistState();
        return true;
    } else {
        adjustDataSetForLocation({country: substituteCountry("My Country")}, api);
        persistState();
        return false;
    }
    async function getLocationData() {
        const locationTimeoutMs = 20000;
        let geo = {
            long:(new URLSearchParams(document.location.search)).get("long"),
            lat: (new URLSearchParams(document.location.search)).get("lat")
        }
        if ((!geo.lat || !geo.long) && navigator.geolocation) {
            console.log("navigator.geolocation.getCurrentPosition()");
            let timeoutId;
            let waitForPosition = Promise.race([
                new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                        geo.long = position.coords.longitude;
                        geo.lat = position.coords.latitude;
                        resolve(true);
                    }, (error) => {
                        reject(error);
                    })
                }),
                new Promise( (resolve, reject) => {
                    timeoutId = setTimeout(() => {
                        reject('Timed out in '+ locationTimeoutMs + 'ms.')
                    }, locationTimeoutMs)
                })
            ]);
            try {
                await waitForPosition;
                clearTimeout(timeoutId);
                console.log(`Fetched location long=${geo.long} lat=${geo.lat}`);

            } catch (e) {
                console.log(`Fetched location error ${e}`);
                clearTimeout(timeoutId);
                setLocationDenied();
                return undefined;
            }
        }
        if (geo.lat && geo.long) {
            console.log("Calling api.bigdatacloud.net for location details");
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?` +
                `latitude=${geo.lat}&longitude=${geo.long}&localityLanguage=en`;
            const getBuffer = bent('string');
            try {
                console.log("location details returned");
                return JSON.parse(await getBuffer(url));
            } catch (e) {
                console.log("Error on bigdatacloud.net" + e)
                return undefined;
            }

        }
        return undefined;
    }
}

function adjustDataSetForLocation(location, api) {

    const {substitutionCountries, setCountrySubstitution, persistState} = api;

        const countrySub = {
        "Taiwan Province of China" : "Taiwan",
        "United States of America" : "United States",
        "United States Virgin Islands" : "Virgin Islands",
        "Bolivia (Plurinational State of)" : "Bolivia",
        "Iran (Islamic Republic of)" : "Iran",
        "Republic of Korea" : "South Korea",
        "Republic of Moldova": "Moldova",
        "Russian Federation" : "Russia",
        "United Republic of Tanzania": "Tanzania",
        "Venezuela (Bolivarian Republic of)": "Venezuela",
        "Syrian Arab Republic": "Syria",
        "Lao People's Democratic Republic": "Laos"
    }
    console.log("Adjusting for location " + JSON.stringify(location));
    location.country = substitutionCountries[location.country] || location.country;

    if (location.county && dataSet.country[location.county])
        setCountrySubstitution("My County", location.county);
    else
        setCountrySubstitution("My County", undefined);

    if (location.state && dataSet.country[location.state])
        setCountrySubstitution("My State", location.state);
    else
        setCountrySubstitution("My State", undefined);

    if (location.country && dataSet.country[location.country])
        setCountrySubstitution("My Country", location.country);
    else
        setCountrySubstitution("My Country", "United States");

}
