//add in Google API information
var gMapsApi = "AIzaSyCaa0_Fa2NqGkWBf5-1Q3Cp-oeYnw8HZCc"


//add the map to the document via leaflet, using a tile set from mapbox
//this adds the map to the map div, and sets where the view is
var map = L.map('map').setView([41.850033, -87.6500523], 4);

//adds the mapbox tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/fncreativeconsole/cjaizvu8vae7m2rl87srktnnz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZm5jcmVhdGl2ZWNvbnNvbGUiLCJhIjoiY2l4ZG8zMnV6MDBtYjJvbDhubm95czhociJ9.X1spJQNzD9LWMktot87ZiQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZm5jcmVhdGl2ZWNvbnNvbGUiLCJhIjoiY2l4ZG8zMnV6MDBtYjJvbDhubm95czhociJ9.X1spJQNzD9LWMktot87ZiQ'
}).addTo(map);


    