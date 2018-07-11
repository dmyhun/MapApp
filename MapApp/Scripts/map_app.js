var map;
var center;
var curentPosition;
var infoWindow;
var infoWindowAdd;
var markerAdd;
var messagewindow;
var marker;

function initMap() {
    center = new google.maps.LatLng(-33.861034, 151.171936);

    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
    });

    getCurentLocation();

    getMarkers();

    infoWindowAdd = new google.maps.InfoWindow({
        content: $('#form').html()
    });

    messagewindow = new google.maps.InfoWindow({
        content: $('#message').html()
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
    });
    
    function getMarkers() {
        $.ajax({
            url: '/api/Map/',
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                $.each(data, function (i, item) {

                    var marker = new google.maps.Marker({
                        'position': new google.maps.LatLng(item.Lat, item.Lng),
                        'map': map,
                        'title': item.Name
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        getMarkerInfo(item.Id, marker);
                    });
                })
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }    

    function getMarkerInfo(id, marker) {
        $.ajax({
            url: '/api/Map/'+id,
            type: 'GET',
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (infoWindow)
                    infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    content: "<div class='markerInfo'><h2>Place: " + data.Name + "</h2><div><h4>Address: "
                        + data.Address + "</h4></div></div>"
                });
                infoWindow.open(map, marker);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
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

    function placeMarker(location) {
        if (markerAdd)
            markerAdd.setMap(null);

        markerAdd = new google.maps.Marker({
            position: location,
            map: map
        });

        google.maps.event.addListener(markerAdd, 'click', function () {
            $("#form").css({ "display": "block" });
            $("#message").css({ "display": "block" });
            infoWindowAdd.open(map, markerAdd);
        });
    }

    function saveData() {
        var position = markerAdd.getPosition();

        var data = {
            Name: $('#name').val(),
            Address: $('#address').val(),
            Type: $('#type').val(),
            Lat: position.lat(),
            Lng: position.lng()
        };
        $.ajax({
            url: '/api/Map/',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                infoWindowAdd.close();
                messagewindow.open(map, markerAdd);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
    }

