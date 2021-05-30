import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl';
import '../assets/sass/main.scss';


window.addEventListener("load", () => {
    loadMapView();
});

let markersPositions;
let mapPosition; 
let view;
let map;
let weather;

const loadMarkers = () => {

    const localStorageMarkers = localStorage.getItem("markers");
    if (localStorageMarkers == null) {
        markersPositions = [];
    } else {
        markersPositions = JSON.parse(localStorageMarkers);
    }
};

const loadMapInfo = () => {

    const localStoragePosition = localStorage.getItem("map-info");
    if (localStoragePosition == null) {
        mapPosition = {
            center: [0,0],
            zoom: 11
        };
    } else {
        mapPosition = JSON.parse(localStoragePosition);
    }
};


const loadMapView = () => {
    view = "map";
    loadMarkers();
    loadMapInfo();

    renderMapViewHeader();
    renderMapViewMain();
    renderMapViewFooter();
};

const renderMapViewHeader = () => {
    const header = document.querySelector('.header');
    header.innerHTML = "<h2>Weather App</h2><h3>GMP2021</h3>";

};

const renderMapViewMain = () => {
    const main = document.querySelector('.main');
    main.innerHTML = '<div id="my_map"></div>';
    renderMap();
    renderMarkers();
    initMapEvents();
};

const renderMapViewFooter = () => {
    const footer = document.querySelector('.footer');
    footer.innerHTML = '<button class="footer_button"><span class="fa fa-crosshairs"></span><span>Go to position</span></button>';

    footer.addEventListener("click", () => {
        flyToLocation();
    });
};

const renderMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnhqYXZpIiwiYSI6ImNrcDlsdHQ0cDBsazgyb24xeDFwc2E4NXYifQ.Kp39aXZl5D2aV2dtkhlL3A';
    map = new mapboxgl.Map({
        container: 'my_map',
        style: 'mapbox://styles/fxjavi/ckpayk0242mdm17p5ccmcszfe',
        center: [mapPosition.lng, mapPosition.lat],
        zoom: mapPosition.zoom
    });
};

const renderMarkers = () => {
    markersPositions.forEach(m => {
        console.log(m);
        new mapboxgl.Marker().setLngLat([m.coord.lon, m.coord.lat]).addTo(map);
    });
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
        localStorage.setItem("map-info", JSON.stringify(storingObj));
    });

    map.on("click", async(ev) => {
        loadSingleView(ev.lngLat);
    });
};

const loadSingleView = async (lngLat) => {
    view = "single";
    loadSpinner();
    await fetchData(lngLat);

    unloadSpinner();
    renderSingleViewHeader();
    renderSingleViewMain();
    renderSingleViewFooter();
};

const loadSpinner = () => {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("opened");
};

const unloadSpinner = () => {
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("opened");
};

const fetchData = async (lngLat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lngLat.lat}&lon=${lngLat.lng}&appid=68f4dadc8b9ce3073fa685e298366fbe`;
    weather = await fetch(url).then(d => d.json()).then(d => d);
};

const renderSingleViewHeader = () => {
    const header = document.querySelector('.header');
    header.innerHTML = `<h2 class="single_view_heading"><button><span class="fa fa-arrow-left"></span></button>${weather.name}</h2>`;

    const buttonBack = header.querySelector('button');
    buttonBack.addEventListener("click", () => {
        loadMapView();
    })
};

let today = new Date();

let time =  today.getHours() + ":" + (today.getMinutes() < 10? '0' : '') + today.getMinutes();

const renderSingleViewMain = () => {
    const main = document.querySelector('.main');
    main.innerHTML = `<div class="single_view_main"> 
    
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    <article class="weather_card"><h5 class="time">${time}</h5><h5 class="temp">${Math.round(((weather.main.temp) - 273.15))}°</h5><h5 class="wind"><span class="fa fa-wind"></span>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></article>
    `;

};

const renderSingleViewFooter = () => {
    const footer = document.querySelector('.footer');
    footer.innerHTML = '<button class="footer_button"><span class="fa fa-save"></span><span>Save data</span></button>';

    footer.addEventListener("click", () => {
        saveMarker();
        loadMapView();
    });

    saveMarker();
};

const saveMarker = () => {
    markersPositions.push(weather);
    localStorage.setItem("markers", JSON.stringify(markersPositions));

    mapPosition = {
        center: [weather.coord.lon, weather.coord.lat],
        zoom: 11
    };

    const storingObj = {
        lat: weather.coord.lat,
        lng: weather.coord.lon,
        zoom: 11
    };
    localStorage.setItem("map.info", JSON.stringify(storingObj));
};