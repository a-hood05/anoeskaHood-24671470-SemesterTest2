//add map
var map = L.map('map').setView([-30, 25], 13);

//basemap
var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
}).addTo(map);

//add layers
//add building
var building = L.geoJSON(buildingsData, {
    style: {color: "black", fillOpacity: 0.8, fillColor: "orange"},
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Building", feature.properties);
    }
}).addTo(map);

//control
var baseMaps = {
    "OpenStreetMap.HOT": osmHOT
};

var overlayMaps = {
    "Building": building
};

L.control.layers(baseMaps, overlayMaps).addTo(map);



