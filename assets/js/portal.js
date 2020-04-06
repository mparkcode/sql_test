//ISS Map
var mymap = L.map('mapid').setView([29.760427, -95.369804], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3VuZHkyNyIsImEiOiJjazg2bmtqdDUwMjZuM2ZxdnhybjRiOGFjIn0.4SvprV2vMhuOHhknpzhE2Q'
}).addTo(mymap);

var issIcon = L.icon({
    iconUrl: 'assets/images/icons/iss.png',
    iconSize: [50, 64],
    iconAnchor: [4, 62],
});

var marker = L.marker([29.7, -95.36], { icon: issIcon }).addTo(mymap); //need to wire this up to actual ISS location

//APOD
$.ajax({
    url: "https://api.nasa.gov/planetary/apod?api_key=dsT6CrZDV5ElMadg5VA98MakyGLRFptKrw5h0BNN",
    success: function (APOD) {
        document.getElementById("img").innerHTML = "<img src=" + APOD.url + " sytle='width:100%;' />";
        document.getElementById("copyright").innerHTML = "By " + APOD.copyright;
        document.getElementById("title").innerHTML = APOD.title;
        document.getElementById("explanation").innerHTML = APOD.explanation;
    }
});
//Get ISS Position
//function getValue() {
  //  var res;
  //  $.ajax({
      //  type: 'GET',
      //  dataType: 'jsonp',
     //   url: 'http://api.open-notify.org/iss-now.json',
     //   async: false,
     //   crossDomain: true,
     //   complete: function (data) {
       //     if (data.readyState === 4 && data.status === 200) {
          //      Lat = data.responseJSON.iss_position.latitude;
            //    Long = data.responseJSON.iss_position.longitude;
          //      LatLong(Lat, Long);
        //        console.log(Lat);
      //      }
    //    }
  //  });
//}

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