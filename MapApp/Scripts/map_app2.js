var map;
var service;
var infowindow;
var marker;
var infowindowContent;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(46.469391, 30.740883),
        zoom: 15
    });

    service = new google.maps.places.PlacesService(map);

    getCurentLocation();

    //start autocomplite search
    var input = document.getElementById('search-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    infowindow = new google.maps.InfoWindow();
    infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    marker = new google.maps.Marker({
        map: map
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
        });
        marker.setVisible(true);
        
        infowindowContent.children['infowindow-content__1'].children['place-image'].setAttribute("src", place.icon);
        infowindowContent.children['infowindow-content__1'].children['place-rating-wrapper'].children['place-rating'].textContent = place.rating;
        infowindowContent.children['infowindow-content__2'].children['place-name'].textContent = place.name;
        infowindowContent.children['infowindow-content__2'].children['place-address-wrapper'].children['place-address'].textContent = place.formatted_address;
        infowindowContent.children['infowindow-content__2'].children['place-phone-wrapper'].children['place-phone'].textContent = place.formatted_phone_number;

        infowindow.open(map, marker);
    });


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

