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

//News Feed 
$(function () {

    var topic = "astronomy";
    var sources = ["google-news", "associated-press","bleacher-report","business-insider"];
    var max_articles = 5;

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
                         $(".news").append('<li>' + '<a target="_blank" style="text-decoration: none;" href=\"' + e.url + '\">' + e.title + '</a></li>');
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
            alert("Transmission received!");
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;
}