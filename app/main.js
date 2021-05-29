import mapboxgl from 'mapbox-gl';
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
let weather;

const loadMarkers = () => {

    const localStorageMarkers = localStorage.getItem("markers");
    if (localStorageMarkers == null) {
        mapPosition = {
            center: [0,0],
            zoom: 11
        };
    } else {
        mapPosition = JSON.parse(localStorageMarkers);
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
    const header = document.querySelector('.header');
    header.innerHTML = "<h2>Busca lo que quieras</h2>";

};

const renderMapViewMain = () => {
    const main = document.querySelector('.main');
    main.innerHTML = '<div id="my_map"></div>';
    renderMap();
};

const renderMapViewFooter = () => {
    const footer = document.querySelector('.footer');
    footer.innerHTML = '<span class="fa fa-crosshair"></span><span>Go to position</span>';

    footer.addEventListener("click", () => {
        flyToLocation();
    });
};

const renderMap = () => {
    map = new mapboxgl.Map({
        container: 'my_map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: mapPosition.center,
        zoom: mapPosition.zoom
    });
};

const renderMarkers = () => {
    markersPositions.forEach()

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