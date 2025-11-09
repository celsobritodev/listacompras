import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {

  constructor(private http: HttpClient ){}

  public getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(environment.urlAPI+"/produtos");
  }

  public addNewProduto(produto:Produto):Observable<Produto>{
     return this.http.post<Produto>(environment.urlAPI+"/produtos",produto);
  }

}
