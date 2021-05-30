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
    header.innerHTML = "<h2>Busca lo que quieras</h2>";

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
    footer.innerHTML = '<span class="fa fa-crosshair"></span><span>Go to position</span>';

    footer.addEventListener("click", () => {
        flyToLocation();
    });
};

const renderMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnhqYXZpIiwiYSI6ImNrcDlsdHQ0cDBsazgyb24xeDFwc2E4NXYifQ.Kp39aXZl5D2aV2dtkhlL3A';
    map = new mapboxgl.Map({
        container: 'my_map',
        style: 'mapbox://styles/mapbox/streets-v11',
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
    header.innerHTML = `<h2><button><span class="fa fa-chevron-left"></span></button>${weather.name}</h2>`;

    const buttonBack = header.querySelector('button');
    buttonBack.addEventListener("click", () => {
        loadMapView();
    })
};

let today = new Date();

let time =  today.getHours() + ":" + (today.getMinutes() < 10? '0' : '') + today.getMinutes();

const renderSingleViewMain = () => {
    const main = document.querySelector('.main');
    main.innerHTML = `<div class="weather_container"> 
    
    <h4><i class="fa fa-clock-o" style="margin-left: .9em; font-size: 24px;"></i></h4> <h4><i class="fa fa-sun-o" style="margin-right: .8em; font-size: 24px;"></i></h4> <h4><i class="fas fa-wind" style="margin-right: 1em; font-size: 24px;"></i></h4> </div>
    
    <div class="back_color_1"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${Math.round(((weather.wind.speed) * 1.6))} km/h</h5></div> </div>
    <div class="back_color_2"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_3"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_4"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_5"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_6"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_7"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_8"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    <div class="back_color_9"> <div class="fetch_container"><h5>${time}</h5><h5>${Math.round(((weather.main.temp) - 273.15))} ºC</h5><h5>${weather.wind.speed} mph</h5></div> </div>
    </div>`;;

};

const renderSingleViewFooter = () => {
    const footer = document.querySelector('.footer');
    footer.innerHTML = '<span class="fa fa-save"></span><span>Save data</span>';

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