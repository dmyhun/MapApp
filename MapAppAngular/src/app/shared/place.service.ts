import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.model';

@Injectable()
export class PlaceService {

  readonly rootUrl = 'http://localhost:50986';
  constructor(private http : HttpClient) { }

  addPlace(place: Place)
  {
    return this.http.post(this.rootUrl + "/addPlace", place);
  }

  getPlaces(userName: string)
  {
    return this.http.get(this.rootUrl + "/getPlaces?userName=" + userName);
  }

  deletePlace(id: number, userName: string)
  {
    return this.http.delete(this.rootUrl + "/deletePlace?id=" + id + "&userName=" + userName);
  }
}
