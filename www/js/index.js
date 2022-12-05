var app = new Framework7({
    // App root element
    el: '#app',
    routes: [
        {
            path: '/',
            url: 'index.html',
        },
        {
            path: '/page2/',
            url: 'pages/page2.html',
        },
        {
            path: '/page3/',
            url: 'pages/page3.html',
        },
    ],
    // ... other parameters
});
var mainView = app.views.create('.view-main')

var $$ = Dom7;
var lat;
var long; //this is declaring the variables globally
var map;
var marker;
var geo0pts = {
    enableHighAccuracy: true
}

$$(document).on('page:init', '.page[data-name="page2"]', function () {
    // Page 2 fun here PUT PAGE 2 ITEMS HERE
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: lat, lng: long} //consider variable scope for here
    }); //can also pull the code from the google maps javascript webpage
    marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map
    })

var watchID;

    $("#startWatch").on('click', function() {
        watchID = navigator.geolocation.watchPosition(watchSuccess, geoError, geo0pts)
        $(this).hide();
        $("#stopWatch").show()
    })
    $("#stopWatch").on('click', function() {
        navigator.geolocation.clearWatch(watchID)
        $(this).hide();
        $("#startWatch").show()
    })

function watchSuccess(position) {
        console.log(position);
        lat = position.coords.latitude //you don't need the "var" at the front here b/c it's been declared globally above
        long = position.coords.longitude;

        var coords = {lat: lat, lng: long}
        map.setCenter(coords);
        marker.setPosition(coords);

        //$("#currentPos").html(lat + ", " + long)
    }


})



document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geo0pts);

}
function geoSuccess(position) {
    console.log(position);
    lat = position.coords.latitude //you don't need the "var" at the front here b/c it's been declared globally above
    long = position.coords.longitude;

    var coords = {lat: lat, lng: long}
    map.setCenter(coords);
    marker.setPosition(coords);

    //$("#currentPos").html(lat + ", " + long)
}

    
    function geoError(message) {
        alert(message.message)
    }

