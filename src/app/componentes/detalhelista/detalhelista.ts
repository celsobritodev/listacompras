import { Component } from '@angular/core';
import { Produto } from '../../model/Produto';
import { ProdutosService } from '../../servicos/produtos-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemLista } from '../../model/item-lista';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-detalhelista',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './detalhelista.html',
  styleUrl: './detalhelista.scss',
})
export class Detalhelista {
  public listaProdutos: Produto[] = [];
  public novoProduto: Produto;
  public novoItem: ItemLista;
  public formNovoProduto: boolean = false;
  public idLista: number = 0;


  constructor(
    private produtoService: ProdutosService,
    private activateRoute: ActivatedRoute

  ) {
    this.novoProduto = new Produto();
    this.novoItem = new ItemLista();
    // Recupera o ID da lista a partir dos parâmetros da rota
    this.idLista = this.activateRoute.snapshot.params['id'];
    console.log("ID da lista:", this.idLista);
  }

  ngOnInit(): void {
    this.recuperarTodosProdutos();
  }

  public recuperarTodosProdutos() {
    // Lógica para recuperar todos os produtos associados à lista
    this.produtoService.getAllProdutos().subscribe({
      next: (res: Produto[]) => {
        this.listaProdutos = res;
      },
      error: (err) => {
        alert('Erro ao recuperar produtos da lista.');
      },
    });
  }

  public adicionarProduto() {
    // Lógica para adicionar um novo produto à lista
  }

  public exibirModal() {
    // Abre o modal de cadastro de nova lista
    document.getElementById('btnModal')?.click();
  }

  public habilitarNovoProduto() {
    this.formNovoProduto = true;
  }

  public cadastrarNovoProduto() {
    // Cria uma cópia do objeto sem o ID
    const produtoParaEnviar = this.removerId(this.novoProduto);

    console.log('Enviando dados:', produtoParaEnviar);

    this.produtoService.addNewProduto(produtoParaEnviar).subscribe({
      next: (res: Produto) => {
        alert('Novo Produto cadastrado');
        this.recuperarTodosProdutos();
        // Reseta o formulário
        this.novoProduto = new Produto();
      },
      error: (err) => {
        alert('Erro ao cadastrar novo produto.');
      },
    });
    this.formNovoProduto = false;
  }

  private removerId(produto: Produto): any {
    const { id, ...produtoSemId } = produto;
    return produtoSemId;
  }

  public adicionarItemLista() {
    // Lógica para adicionar o novo item à lista com o ID da lista atual
    this.novoItem.lista.id = this.idLista;
    console.log('Adicionando item à lista ID:', this.idLista, 'Item:', this.novoItem);
    // Aqui você pode chamar um serviço para salvar o item na lista específica
  }

}
