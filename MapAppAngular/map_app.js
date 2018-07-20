var map;
var service;
var infowindow;
var marker;
var directionsService;
var directionsDisplay;
var myLocation;
var places;
var mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#263c3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b9a76"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#38414e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#0a23b4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#040251"
            }
        ]
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"),
        {
            center: new google.maps.LatLng(46.469391, 30.740883),
            zoom: 15,
            styles: mapStyle,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false
});

    /*service = new google.maps.places.PlacesService(map);

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    renderPlaces();

    getCurentLocation();

    autocompliteSearch();*/
}
/*
function getCurentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            map.setCenter(myLocation);
                marker = new google.maps.Marker({
                    map: map,
                    position: myLocation
                });
                $("#btnGetCurentLocation").attr('disabled', false);
        });
    }
}

function autocompliteSearch() {
    var input = document.getElementById("search-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
    var infowindowContent = document.getElementById("infowindow-content");
    autocomplete.bindTo("bounds", map);
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(infowindowContent);

    marker = new google.maps.Marker({
        map: map
    });

    marker.addListener("click",
        function() {
            infowindow.open(map, marker);
        });

    autocomplete.addListener("place_changed",
        function() {
            var place = autocomplete.getPlace();
            infowindow.close();
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setPlace({
                placeId: place.place_id,
                location: place.geometry.location
            });
            marker.setVisible(true);
            setInfowindowContent(place);
            infowindow.open(map, marker);
        });

    function setInfowindowContent(place) {
        var photoUrl = (place.photos != null) ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 }) : place.icon;
        var ratingInfo = (place.rating != null) ? "Google Rank: " + place.rating + "/5" : "";

        infowindowContent.querySelector("#googlePlaceId").setAttribute("value", place.id);
        infowindowContent.querySelector("#place-image").setAttribute("src", photoUrl);
        infowindowContent.querySelector("#place-rating").textContent = ratingInfo;
        infowindowContent.querySelector("#place-name").textContent = place.name || "No data avaliable";
        infowindowContent.querySelector("#place-address").textContent = place.formatted_address || "No data avaliable";
        infowindowContent.querySelector("#place-phone").textContent =
            place.formatted_phone_number || "No data avaliable";
    }
}

function displayRoute() {
    var places = $("p.placeAddress");
    var origin;
    var destination;
    var waypoints = [];

    if (!myLocation)
        return false;
    switch (places.length) {
    case 0:
        break;
    case 1:
        origin = myLocation;
        destination = places[0].innerHTML;
        break;
    case 2:
        origin = myLocation;
        destination = places[1].innerHTML;
        waypoints.push({ location: places[0].innerHTML, stopover: true });
        break;
    default:
        origin = myLocation;
        destination = places[places.length - 1].innerHTML;
        for (var i = 1; i <= places.length - 1; i++) {
            waypoints.push({ location: places[i].innerHTML, stopover: true });
        } 
    }
    directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'DRIVING',
        avoidTolls: true
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);

        } else {
            alert('Could not display directions due to: ' + status);
        }
    });
}

function hideRoute() {
    directionsDisplay.setDirections({ routes: [] });
}

function addPlace() {
    var userName = $("#UserName").val();

    var data = {
        UserName: userName,
        Name: document.getElementById("place-name").innerText,
        Address: document.getElementById("place-address").innerText,
        PhoneNumber: document.getElementById("place-phone").innerText,
        GooglePlaceId: document.getElementById("googlePlaceId").getAttribute("value"),
        ImgUrl: document.getElementById("place-image").getAttribute("src")
    };

    $.ajax({
        url: '/api/Place/',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            renderPlaces();
            infowindow.close();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function deletePlace(id) {
    var userName = $("#UserName").val();

    $.ajax({
        url: '/api/Place/?id=' + id + '&userName=' + userName,
        type: 'DELETE',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            renderPlaces();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function renderPlaces() {
    var userName = $("#UserName").val();

    $.ajax({
        url: '/Home/RenderPlaces/?userName=' + userName,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $("#placeLoaded").html(data);
            places = $("p.placeAddress");
            ifNavigationIsEnabled();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

$("#btnSubmiteditUserForm").click(function (e) {
    $.ajax({
        url: "/Home/EditUser",
        type: "POST",
        data: new FormData($('form#editUserForm')[0]),
        processData: false, 
        contentType: false,
        success: function (data) {
            $("#userInfo").html(data);
            $('#modalSettings').modal('hide');
        }
    });
  e.preventDefault();

    
});

function ifNavigationIsEnabled() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            (places.length) ? $("button#btnDisplayRoute, button#btnHideRoute").attr('disabled', false) : $("button#btnDisplayRoute, button#btnHideRoute").attr('disabled', true);
        });
    }
}*/