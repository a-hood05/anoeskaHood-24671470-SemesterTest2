//add map
var map = L.map('map').setView([-30, 25], 13);

//basemap
var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
}).addTo(map);

//control
var baseMaps = {
    "OpenStreetMap.HOT": osmHOT
};

L.control.layers(baseMaps).addTo(map);