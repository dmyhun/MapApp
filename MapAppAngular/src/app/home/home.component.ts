import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { UserClaim } from '../shared/user.model';
import { MapComponent } from './map/map.component';
import { Place } from '../shared/place.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }

  userClaims: UserClaim = new UserClaim();
  places: Place[] = [];

  @ViewChild('search') public searchElement : ElementRef;
  
  @ViewChild(MapComponent)
  private mapComponent: MapComponent;

  ngOnInit() {   
    console.log("ngOnInit() - HomeComponent");
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      console.log( this.userClaims.UserName + " - got from userClaims HomeComponent");
      this.getPlaces();
    });
  }
  onLoggedOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/account']);
  }

  getCurentLocation() {
    console.log("getCurentLocation() ");
    this.mapComponent.setCurrentPosition();
  }

  getPlaces() {
    console.log("getPlaces() ");
    
    console.log(this.mapComponent.getPlaces(this.userClaims.UserName));

    this.mapComponent.getPlaces(this.userClaims.UserName).subscribe(data =>
      this.places = data
    );
  }

  deletePlace(id: number, userName: string) {
    this.mapComponent.deletePlace(id, userName).subscribe((data : any) => {
      this.getPlaces();
    });
  }

  onAddPlace(place: Place){
    this.getPlaces();
  }  

  planTrip(){
    this.mapComponent.planTrip();
  }
}
