import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { UserClaim } from '../../shared/user.model';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { Place } from '../../shared/place.model';
import { PlaceService } from '../../shared/place.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone:NgZone, private service: PlaceService) { }
  center = {
    lat: 46.469391,
    lng: 30.740883
  };
  meMarker: marker;
  placeMarker: marker;
  waypoints = {
    lat: 46.469391,
    lng: 30.740883
  }
  places: Place[];
  place: Place;

  @Input() searchElement : ElementRef;
  @Input() userName: string;

  ngOnInit() {
    console.log("ngOnInit() - MapComponent")
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
          types:["establishment"]
        });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run( () => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            
            if(place.geometry === undefined || place.geometry === null) {
              return;
            }           

            this.placeMarker = {
              lat : place.geometry.location.lat(),
              lng : place.geometry.location.lng()
            };                                   
            this.center.lat = this.placeMarker.lat;
            this.center.lng = this.placeMarker.lng;

            this.placeMarker.lat;

            this.place = {
              UserName : this.userName,
              GooglePlaceId: place.place_id,
              Name: place.name,
              Address: place.formatted_address,
              PhoneNumber: place.formatted_phone_number,
              ImgUrl: place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}),
              Id:0,
              Lat: place.geometry.location.lat(),
              Lng: place.geometry.location.lng()
            };
          });

          console.log(this.place);
        });
      }
    );
  }   
   

  setCurrentPosition() {
    console.log(" setCurrentPosition()")
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
      this.meMarker = {
        lat :  position.coords.latitude,
        lng :  position.coords.longitude
      };
      this.center.lat = this.meMarker.lat;     
      this.center.lng = this.meMarker.lng;
      });
    }
  }

  @Output() onAddPlace = new EventEmitter<boolean>();
  
  addPlace() {
    this.service.addPlace(this.place).subscribe( (data : any) => {
      this.onAddPlace.emit();
    }, (er)=>{
      console.log("error");
    });
  }

  getPlaces(userName: string) {
    console.log(userName + "- getPlaces() from MapComponent")
    return this.service.getPlaces(userName).map((data : any) => {
      return data;
    });
  }

  deletePlace(id : number, userName : string) {
    return this.service.deletePlace(id, userName).map((data : any) => {
      return true;
    });
  }

  planTrip() {
    
  }
}

interface marker {
  lat: number,
  lng: number,
}
