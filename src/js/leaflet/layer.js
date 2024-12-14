var school = new L.LayerGroup();
var jalan = new L.LayerGroup();
var tebet = new L.LayerGroup();
var tebetBorder = new L.LayerGroup();
var jaksel = new L.LayerGroup();

var map = L.map('map', {
    center: [-6.237050264556689, 106.85301062524744],
    zoom: 13,
    zoomControl: false,
    layers: [school, tebetBorder]
});

var GoogleMaps = new L.TileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Maps'
}).addTo(map);

var GoogleSatelliteHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    attribution: 'Google Satellite'
});

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
});

var GoogleRoads = new L.TileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Roads'
});

var baseLayers = {
    'Google Satellite Hybrid': GoogleSatelliteHybrid,
    'OpenStreetMap': OpenStreetMap,
    'Google Maps': GoogleMaps,
    'Google Roads': GoogleRoads
};

var groupedOverlays = {
    "Peta Dasar": {
        'Sekolah': school,
        'Jalan Jakarta Selatan': jalan,
        'Tebet': tebet,
        'Kota Jakarta Selatan': jaksel,
    }
};

// L.control.layers(baseLayers, overlayLayers, {collapsed: true}).addTo(map);
L.control.groupedLayers(baseLayers, groupedOverlays, {collapsed: true}).addTo(map);

/* 
GEOJSON LAYER 
*/
var baseUrl = window.location.origin;
console.log(baseUrl);

$.getJSON(baseUrl + '/src/assets/gis/geojson/titik-sekolah.geojson', function (data) {
    var ratIcon = L.icon({
        iconUrl: '/src/assets/gis/marker.png',
        iconSize: [24, 24]
    });
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, { icon: ratIcon });
            marker.bindPopup(feature.properties.NAMA_SEKOLAH);
            return marker;
        }
    }).addTo(school);
});

$.getJSON(baseUrl +'/src/assets/gis/geojson/jalan-jaksel.geojson', function (data) {
    L.geoJson(data, {
        style: function (feature) {
            var color,
                kode = feature.properties.kode;
            if (kode < 2) color = "#f2051d";
            else if (kode > 0) color = "#f2051d";
            else color = "#f2051d"; // no data
            return { color: color, weight: 1, fillOpacity: 0.8 };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Informasi yang ingin ditampilkan");
        }
    }).addTo(jalan); 
});


$.getJSON(baseUrl + '/src/assets/gis/geojson/polygon-tebet.geojson', function (kode) {
    L.geoJson(kode, {
        style: function (feature) {
            var fillColor,
                kode = feature.properties.id;
            if (kode > 21) fillColor = "#006837";
            else if (kode > 20) fillColor = "#fec44f"
            else if (kode > 19) fillColor = "#c2e699"
            else if (kode > 18) fillColor = "#fee0d2"
            else if (kode > 17) fillColor = "#756bb1"
            else if (kode > 16) fillColor = "#8c510a"
            else if (kode > 15) fillColor = "#01665e"
            else if (kode > 14) fillColor = "#e41a1c"
            else if (kode > 13) fillColor = "#636363"
            else if (kode > 12) fillColor = "#762a83"
            else if (kode > 11) fillColor = "#1b7837"
            else if (kode > 10) fillColor = "#d53e4f"
            else if (kode > 9) fillColor = "#67001f"
            else if (kode > 8) fillColor = "#c994c7"
            else if (kode > 7) fillColor = "#fdbb84"
            else if (kode > 6) fillColor = "#dd1c77"
            else if (kode > 5) fillColor = "#3182bd"
            else if (kode > 4) fillColor = "#f03b20"
            else if (kode > 3) fillColor = "#31a354";
            else if (kode > 2) fillColor = "#78c679";
            else if (kode > 1) fillColor = "#c2e699";
            else if (kode > 0) fillColor = "#ffffcc";
            else fillColor = "#f7f7f7"; // no data
            return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.tebet)
        }
    }).addTo(tebet);
});

$.getJSON(baseUrl + '/src/assets/gis/geojson/polygon-jaksel.geojson', function (kode) {
    L.geoJson( kode, {
        style: function(feature){
            var fillColor,
                kode = feature.properties.id;
            if ( kode > 21 ) fillColor = "#006837";
            else if (kode>20) fillColor="#fec44f"
            else if (kode>19) fillColor="#c2e699"
            else if (kode>18) fillColor="#fee0d2"
            else if (kode>17) fillColor="#756bb1"
            else if (kode>16) fillColor="#8c510a"
            else if (kode>15) fillColor="#01665e"
            else if (kode>14) fillColor="#e41a1c"
            else if (kode>13) fillColor="#636363"
            else if (kode>12) fillColor= "#762a83"
            else if (kode>11) fillColor="#1b7837"
            else if (kode>10) fillColor="#d53e4f"
            else if (kode>9) fillColor="#67001f"
            else if (kode>8) fillColor="#c994c7"
            else if (kode>7) fillColor="#fdbb84"
            else if (kode>6) fillColor="#dd1c77"
            else if (kode>5) fillColor="#3182bd"
            else if ( kode > 4 ) fillColor ="#f03b20"
            else if ( kode > 3 ) fillColor = "#31a354";
            else if ( kode > 2 ) fillColor = "#78c679";
            else if ( kode > 1 ) fillColor = "#c2e699";
            else if ( kode > 0 ) fillColor = "#ffffcc";
            else fillColor = "#f7f7f7"; // no data
            return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
        },
        onEachFeature: function( feature, layer ){
            layer.bindPopup(feature.properties.jaksel)
        }
    }).addTo(jaksel);
});


$.getJSON(baseUrl + '/src/assets/gis/geojson/polygon-tebet.geojson', function (kode) {
    L.geoJson(kode, {
        style: function (feature) {
            return { color: "orange", weight: 3, fillOpacity: 0, dashArray: '5' }; // Orange dashed border, no fill
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.tebet);
        }
    }).addTo(tebetBorder);
});


