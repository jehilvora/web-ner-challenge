import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntitiesResponse } from '../model/entities-response';

@Injectable({
  providedIn: 'root'
})
export class NERService {
  
  static readonly ENTITIES_URL = '/';
  constructor(private http: HttpClient) { }

  getEntities(text): Observable<EntitiesResponse> {
    return this.http.post<EntitiesResponse>(NERService.ENTITIES_URL, {
      rawtext: text
    });
  }
}
