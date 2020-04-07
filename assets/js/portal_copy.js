//ISS Map
var map = L.map('map').setView([29.760427, -95.369804], 5);
var markers = new L.FeatureGroup();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3VuZHkyNyIsImEiOiJjazg2bmtqdDUwMjZuM2ZxdnhybjRiOGFjIn0.4SvprV2vMhuOHhknpzhE2Q'
}).addTo(map);

map.addLayer(markers);
function showISS() {
  $.getJSON('https://api.open-notify.org/iss-now.json?callback=?', function(data) {
   var issIcon = L.divIcon({
    className: 'iss-icon',
    iconSize: [25, 25],
     html: '<span></span>'
	 });
   var currLatLng = L.latLng(data.iss_position.latitude, data.iss_position.longitude);
   path.push(currLatLng);
    var polyline = L.polyline(path, {color: 'red', weight: 2, opacity: 1, dashArray: [3,6]});
    markers.clearLayers();
   var marker = L.marker(currLatLng, {icon: issIcon});
    //L.marker(currLatLng, {icon: issIcon}).addTo(map);
    markers.addLayer(marker);
    markers.addLayer(polyline);

  }); 
	setTimeout("showISS()", 7000);
};
showISS();


//APOD
$.ajax({
    url: "https://api.nasa.gov/planetary/apod?api_key=dsT6CrZDV5ElMadg5VA98MakyGLRFptKrw5h0BNN",
    success: function (APOD) {
        document.getElementById("img").innerHTML = "<img src=" + APOD.url + ">"; 
        document.getElementById("copyright").innerHTML = "By " + APOD.copyright;
        document.getElementById("title").innerHTML = APOD.title;
        document.getElementById("explanation").innerHTML = APOD.explanation;
    }
}); 

//Calculate myLocation
var userPosition = document.getElementById("overpass");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        userPosition.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    userPosition.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

//EmailJS//
function sendMail(contactForm) {
    emailjs.send("dan_gunderson", "template_gUHgrGED", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "request": contactForm.contactsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;
}