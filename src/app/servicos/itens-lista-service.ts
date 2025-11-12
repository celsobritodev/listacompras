import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemLista } from '../model/item-lista';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItensListaService {

  constructor(private http: HttpClient ){}

  public adicionarNovoItem(item: ItemLista):Observable<ItemLista>{
     return this.http.post<ItemLista>(environment.urlAPI+"/itemlista",item);
  }

   // 👈 **ADICIONE ESTE MÉTODO PARA BUSCAR ITENS POR LISTA**
  public recuperarItensPorLista(idLista: number): Observable<ItemLista[]> {
    const endPoint: string = `${environment.urlAPI}/itemlista/lista/${idLista}`;
    console.log('EndPoint para itens da lista:', endPoint);
    return this.http.get<ItemLista[]>(endPoint);
  }

}
