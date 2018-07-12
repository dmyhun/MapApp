var map;
var service;
var infowindow;
var marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(46.469391, 30.740883),
        zoom: 15
    });

    service = new google.maps.places.PlacesService(map);

    getCurentLocation();

    autocompliteSearch();
}

function getCurentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            curentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(curentPosition);
        }, function () { });
    }
}

function autocompliteSearch() {
    var input = document.getElementById('search-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var infowindowContent = document.getElementById('infowindow-content');
    autocomplete.bindTo('bounds', map);
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(infowindowContent);

    marker = new google.maps.Marker({
        map: map
    });

    marker.addListener('click',
        function () {
            infowindow.open(map, marker);
        });

    autocomplete.addListener('place_changed', function () {
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

        infowindowContent.querySelector('#place-image').setAttribute("src", photoUrl);
        infowindowContent.querySelector('#place-rating').textContent = ratingInfo;
        infowindowContent.querySelector('#place-name').textContent = place.name || "No data avaliable";
        infowindowContent.querySelector('#place-address').textContent = place.formatted_address || "No data avaliable";
        infowindowContent.querySelector('#place-phone').textContent = place.formatted_phone_number || "No data avaliable";
    }
}

