// Add map
var map = L.map('map').setView([51.505, -0.09], 13);

// Basemaps
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
}).addTo(map);

//Popup function for an interactive vibe
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

//Zoom to layers
map.fitBounds(aoi.getBounds());

//Layer controls
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT
};

var overlayMaps = {
    "UP Farm Area of Interest": aoi,
    "Buildins": buildings,
    "Irrigation": irrigation,
    "Road": roads,
    "Tank (JoJo)": tanks,
    "Sensor": sensors,
    "Tree": trees
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

//scale
L.control.scale({imperial: false}).addTo(map);

//Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<b>Legend</b><br>' +
        '<i class="box" style="background: black"></i>UP Farm Area of Interest<br>' +
        '<i class="box" style="background: orange"></i>Buildings<br>' +
        '<i class="line" style="background: blue"></i>Irrigation<br>' +
        '<i class="line" style="background: brown"></i>Road<br>' +
        '<i class="circle" style="background: blue"></i>Tank (JoJo)<br>' +
        '<i class="circle" style="background: yellow"></i>Sensor<br>' +
        '<i class="box" style="background: green"></i>Tree';
    return div;
};
legend.addTo(map);


//North arrow
var north = L.control({position: 'topleft'});

north.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'north');
    div.innerHTML = '<b>^</b><br>N';
    return div;
};
north.addTo(map);

//Stats data
function updateStats(){
    var count = 0;
    buildings.eachLayer(function() {
        count++;
    });
    document.getElementById('statsBuildings').innerHTML = count;
    document.getElementById('statsSensors').innerHTML = sensorsData.features.length;
    document.getElementById('statsTrees').innerHTML = treesData.features.length;
}
updateStats();

//Gutter filter
var gutterFilter = document.getElementById('gutterFilter')

gutterFilter.addEventListener ('change', function() {
    var choice = gutterFilter.value;
    var chosenBuildings = buildingsData.features.filter(function (feature){
        if(choice === 'yes') {
            return feature.properties.gutter == 1;
        }
        else if (choice === 'no') {
            return feature.properties.gutter == 0;
        }
        else { 
            return true;
        }
    });

buildings.clearLayers();
buildings.addData({ type: 'FeatureCollection', features: chosenBuildings });

updateStats ();
});