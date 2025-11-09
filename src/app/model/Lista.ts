export class Lista {
  public id: number;
  public data: Date;
  public nomeMercado: string;
  public valorTotal: number;
  public status: number;

  constructor(
    id: number = 0,
    data: Date = new Date(),
    nomeMercado: string = '',
    valorTotal: number = 0,
    status: number = 0
  ) {
    this.id = id;
    this.data = data;
    this.nomeMercado = nomeMercado;
    this.valorTotal = valorTotal;
    this.status = status;
  }
}

