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

    new google.maps.Marker({
        position: {lat: 49.6775518, lng: -112.8603756 },
        map: map
    })
    new google.maps.Marker({
        position: {lat: 49.6775395, lng: -112.8589969 },
        map: map
    })

    // maybe use this for the geolocation trigger? https://stackoverflow.com/questions/13194623/get-location-when-pages-loads
    //you need to have page 3 open when the user walks within the coordinates
    //PLANTS: 49.6775419, -112.8608828 / 49.6773438, -112.8607528 / 49.6778070, -112.8597402 / 49.6776284, -112.8596564 
    // CHAIRS: 49.6776046, -112.8592380 / 49.6774562, -112.8591515 / 49.6776219, -112.8589265 / 49.6775382, -112.8588551
    // 

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





    //this section is for the movement of the breathe circle
    $$(document).on('page:init', '.page[data-name="page3"]', function () {
        if(window.DeviceOrientationEvent){
            window.addEventListener("deviceorientation", handleMotion)
        }else {
            alert("sorry your browser does not support this")
        }
        
        var moveboxOne = 0;
        var moveboxTwo = 0;
        var moveboxThree = 0;

        function handleMotion(event){
            //console.log(event)
            var z = event.alpha;
            var x = event.beta;
            var y = event.gamma;

            // $("#z").text("z: " + z)
            // $("#x").text("x: " + x)
            // $("#y").text("y: " + y)

// z: 270, x: 0.6, y: -0.1
// x MAX: 1.3, MIN: -1.3
//

            // so this is supposed to be the boundary, it TECHNICALLY works the way it's written, but it's not quite what I had envisioned. It's supposed to stop moving when it hits the wall of the outer circle, but instead I was able to get it to stop moving when the phone is tilted to a certain degree. It's a workaround for now.


            if ( x > 4 || x < -4 ) {
                moveboxOne = moveboxOne
            } 
            else {
                moveboxOne += x/2
            }

            if ( y > 4 || y < -4 ) {
                moveboxTwo = moveboxTwo
            } 
            else {
                moveboxTwo += y/2
            }

            if ( z > 4 || z < -4 ) {
                moveboxThree = moveboxThree
            } 
            else {
                moveboxThree += z/2
            }


            $(".box").css("transform", "translateZ(" + moveboxThree + "px) translateX(" + moveboxOne + "px) translateY(" + moveboxTwo + "px)")

            Number.prototype.map = function (in_min, in_max, out_min, out_max) {
                return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
            
            var r = z.map(0, 360, 0, 255)
            var g = x.map(-180, 180, 0, 255)
            var b = y.map(-90, 90, 0, 255)
            
            $("body").css("background", "rgb(" + r + ", " + g + ", " + b + ")")

        
        }

    })

}