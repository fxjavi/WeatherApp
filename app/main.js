import '../assets/sass/main.scss'


window.addEventListener("load", () => {
    loadMapView();
    renderMap();
    renderMarkers();
    initMapEvents();
});

let markersPositions;
let mapPosition; 
let view;
let map;
let markers;

const loadMarkers = () => {

    const localStorageMarkers = localStorage.getItem("markers");
    if (localStorageMarkers == null) {
        markersPositions = [];
    } else {
        markersPositions = JSON.parse(localStorageMarkers);
    }
};

const loadMapInfo = () => {

};

const loadMapView = () => {
    loadMarkers();
    loadMapInfo();

    renderMapViewHeader();
    renderMapViewMain();
    renderMapViewFooter();
};

const renderMapViewHeader = () => {

};

const renderMapViewMain = () => {

};

const renderMapViewFooter = () => {
    
    flyToLocation();
};

const renderMap = () => {

};

const renderMarkers = () => {

};

const flyToLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        map.flyTo({
            center: [lng, lat],
            zoom: 9
        })
    });
};

const initMapEvents = () => {
    map.on("move", (ev) => {
        const center = ev.target.getCenter();
        const zoom = ev.target.getZoom();
        const storingObj = {
            lat: center.lat,
            lng: center.lng,
            zoom: zoom
        };
        localStorage.setItem("center", JSON.stringify(storingObj));
    });

    map.on("click", async(ev) => {
        loadSingleView(ev.lngLat);
    });
};

const loadSingleView = async (lngLat) => {
    loadSpinner();
    await fetchData();

    unloadSpinner();
    renderSingleViewHeader();
    renderSingleViewMain();
    renderSingleViewFooter();
};

const loadSpinner = () => {

};

const unloadSpinner = () => {

};

const fetchData = async (lngLat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lngLat.lat}&lon=${ev.lngLat.lng}&appid=68f4dadc8b9ce3073fa685e298366fbe
    `;
    const weather = await fetch(url).then(d => d.json()).then(d => d);
    unloadSpinner();
};

const renderSingleViewHeader = () => {

};

const renderSingleViewMain = () => {

};

const renderSingleViewFooter = () => {

    saveMarker();
};

const saveMarker = () => {
    loadMapView();
};