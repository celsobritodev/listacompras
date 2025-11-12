import { Lista } from "./Lista";
import { Produto } from "./Produto";

export class ItemLista {

  public numSeq: number = 0;
  public quantidade: number = 0;
  public precoTotal: number = 0;
  public concluido: number = 0;
  public produto: Produto;
  public lista: Lista = new Lista();

  constructor() {
    this.produto = new Produto();
  }



}
