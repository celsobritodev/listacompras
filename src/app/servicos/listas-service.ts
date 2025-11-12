import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/Lista';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListasService {
  constructor(private http: HttpClient) {}

  public recuperarListas(): Observable<Lista[]> {
    const endPoint: string = environment.urlAPI + '/listas';
    console.log('EndPoint: ' + endPoint);
    return this.http.get<Lista[]>(endPoint);
  }

  public cadastrarLista(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(environment.urlAPI + '/listas', lista);
  }

  // 👈 **ADICIONE ESTE MÉTODO NOVO**
  public recuperarListaPorId(id: number): Observable<Lista> {
    const endPoint: string = `${environment.urlAPI}/listas/${id}`;
    console.log('EndPoint para detalhes:', endPoint);
    return this.http.get<Lista>(endPoint);
  }
}
