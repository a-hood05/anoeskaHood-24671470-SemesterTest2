//add map
var map = L.map('map').setView([-30, 25], 13);

//added basemap
var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
}).addTo(map);

//Popup function
function makepopup (title, properties) {
    var html = '<b>' + title + '</b><br>'
    for (var key in properties) {
        if (properties[key] != null) {
            html += key + ': ' + properties[key] + '<br>'
        }
    }
    return html;
}

//Data layers
//Farm aoi
var aoi = L.geoJSON(Farm_aoi, {
    style: {color: "black", fillOpacity: 0},
    onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Farm Area of Interest", feature.properties));
    }
}).addTo(map);

//Buildings
var buildings = L.geoJSON(buildingsData, {
    style: {color: "black", fillOpacity: 0.8, fillColor: "orange", weight: 0.6},
    onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Building", feature.properties));
    }
}).addTo(map);

//Irrigation
var irrigation = L.geoJSON(irrigationData, {
    style: {color: "blue", dashArray: "6 4"},
    onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Irrigation", feature.properties));
    }
}).addTo(map);

//Roads
var roads = L.geoJSON(roadsData, {
    style: {color: "brown", weight: "0.6"},
    onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Road", feature.properties));
    }
}).addTo(map);

//Tanks
var tanksStyle = {
    radius: 6,
    fillColor: "#0026ff",
    color: "#000",
    weight: 0.6,
    opacity: 1,
    fillOpacity: 0.8
};

var tanks = L.geoJSON(tanksData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, tanksStyle);
    },
     onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Tank", feature.properties));
    }
}).addTo(map);

//Sensors
var sensorStyle = {
    radius: 6,
    fillColor: "yellow",
    color: "#000",
    weight: 0.6,
    opacity: 1,
    fillOpacity: 0.8
};

var sensors = L.geoJSON(sensorsData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, sensorStyle);
    },
     onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Sensor", feature.properties));
    }
}).addTo(map);

//Trees
var treesStyle = {
    radius: 6,
    fillColor: "green",
    color: "#000",
    weight: 0.4,
    opacity: 1,
    fillOpacity: 0.8
};

var trees = L.geoJSON(treesData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, treesStyle);
    },
     onEachFeature: function (feature, layer) {
        layer.bindPopup(makepopup("Tree", feature.properties));
    }
}).addTo(map);

//Zoom to layers when you open the map
map.fitBounds(aoi.getBounds());





