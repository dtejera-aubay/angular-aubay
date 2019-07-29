import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  url: string; 

  constructor(public http: HttpClient) { 
    this.url = environment.urlLibros;
  }

  getAll(clave: string) : Promise<any> {

    return this.http.get(this.url + clave).toPromise()
  }

  getAllRx(clave: string) : Observable<Array<string>> {

    // pipe devuelte un observable
    return this.http.get(this.url + clave)
    .pipe( map( (response: any) => response.items ))
    .pipe( map( (response: Array<any>) => response.map(item => item.volumeInfo.title)
    ))
  }
}
