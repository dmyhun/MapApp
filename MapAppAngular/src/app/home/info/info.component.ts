import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { UserClaim } from '../../shared/user.model';
import { MapsAPILoader } from '@agm/core'
import {} from '@types/googlemaps'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() userInfo:UserClaim;

  constructor() { }

  ngOnInit() {
  }

  @Output() onLoggedOut = new EventEmitter<boolean>();
  logout() {
      this.onLoggedOut.emit();
  }

}
