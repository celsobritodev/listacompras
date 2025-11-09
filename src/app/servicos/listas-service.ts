import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/Lista';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ListasService {

  constructor(private http: HttpClient ){}

  public recuperarListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(environment.urlAPI+"/listas");

  }

  public cadastrarLista(lista:Lista):Observable<Lista>{
     return this.http.post<Lista>(environment.urlAPI+"/lista",lista);
  }

}
