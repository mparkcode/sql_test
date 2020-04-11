//NASA Astronomy Picture of the Day (APOD)
$.ajax({
    url: "https://api.nasa.gov/planetary/apod?api_key=dsT6CrZDV5ElMadg5VA98MakyGLRFptKrw5h0BNN",
    success: function (APOD) {
        document.getElementById("img").innerHTML = '<img alt="NASA APOD" style="max-height: 600px; max-width: 100%;" src=' + APOD.hdurl + ' />';
        document.getElementById("copyright").innerHTML = "By " + APOD.copyright;
        document.getElementById("title").innerHTML = APOD.title;
        document.getElementById("explanation").innerHTML = APOD.explanation;
    }
});

//Map Setup
var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 0,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3VuZHkyNyIsImEiOiJjazg2bmtqdDUwMjZuM2ZxdnhybjRiOGFjIn0.4SvprV2vMhuOHhknpzhE2Q'
}).addTo(map);

//ISS Position Ingest
function moveISS () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];

        $('#lat').html(lat);
        $('#lon').html(lon);

        iss.setLatLng([lat, lon]);
        map.panTo([lat, lon]);

    });
    setTimeout(moveISS, 5000);
}

//Add custom icon
var ISSIcon = L.icon({
    iconUrl: 'assets/images/icons/iss.png',
    iconSize: [50, 64],
    iconAnchor: [4, 62],
});

var iss = L.marker([0, 0], {icon: ISSIcon}).addTo(map);

moveISS();

//People in space
$.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
   var number = data['number'];
   $('#soulsonboard').html(number);

 });

$.ajax({
    url: "https://api.nasa.gov/planetary/apod?api_key=dsT6CrZDV5ElMadg5VA98MakyGLRFptKrw5h0BNN",
    success: function (APOD) {
        document.getElementById("img").innerHTML = '<img alt="NASA APOD" style="max-height: 600px; max-width: 100%;" src=' + APOD.hdurl + ' />';
        document.getElementById("copyright").innerHTML = "By " + APOD.copyright;
        document.getElementById("title").innerHTML = APOD.title;
        document.getElementById("explanation").innerHTML = APOD.explanation;
    }
});

//News articles provided by NewsApi.org
//var url = 'http://newsapi.org/v2/everything?' +
  //        'q=Space&' +
    //      'sortBy=popularity&' +
      //    'number_of_items:"10"' +
        //  'apiKey=af26ee1b125547a98e4c4414986345ab';

//var req = new Request(url);

//fetch(req)
//    .then(function(response) {
//        console.log(response.json());
//    })

$(function () {

    var topic = "space";
    //Italian sources
    var sources = ["google-news", "associated-press","bleacher-report","business-insider"];
    //some of the principles English/American sources
    //sources: ["abc-news", "ars-technica", "google-news", "associated-press","bleacher-report","business-insider"];
    var max_articles = 6;

    $.ajax({
        url      : "https://newsapi.org/v2/everything?apiKey=af26ee1b125547a98e4c4414986345ab&q="+topic+"&sources="+sources,
        dataType : 'json',
        success  : function (data) {
            $(".news").empty();
            if (data.status == "ok" && data.totalResults > 0) {
                console.log("https://newsapi.org/v2/everything?apiKey=af26ee1b125547a98e4c4414986345ab&q="+topic+"&sources="+sources);

                var counter = 0;

                $.each(data.articles, function (i, e) {
                    if(counter < max_articles){
                         $(".news").append('<li>' + '<a href=\"' + e.url + '\">' + e.title + '</a></li>');
                         counter++;
                    }
                });
            }else{
                $('.news').append('<li>No news were found with these parameters.</li>')
            }
        }
    });
});

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




//The below code is the start of calculating the next ISS overpass, which I did not have time to finish for this project but is a feature I would add in a future release

//var userPosition = document.getElementById("overpass");
//function getLocation() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(showPosition);
//    } else {
//        userPosition.innerHTML = "Geolocation is not supported by this browser.";
//    }

    //Calculate overpass
//    var overpassURL = "http://api.open-notify.org/iss-pass.json?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&callback=CALLBACK";
//    $.getJSON(overpassURL, function(data) {
//        data['response'].forEach(function (d) {
//            var date = new Date(d['risetime']*1000);
//             $('#isspass').append('<li>' + date.toString() + '</li>');
//        });
//    });
//}

//function showPosition(position) {
//    userPosition.innerHTML = "Latitude: " + position.coords.latitude +
//        "<br>Longitude: " + position.coords.longitude;
//}
