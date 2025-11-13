import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/Produto';
import { ProdutosService } from '../../servicos/produtos-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemLista } from '../../model/item-lista';
import { ActivatedRoute } from '@angular/router';
import { ItensListaService } from '../../servicos/itens-lista-service';
import { ListasService } from '../../servicos/listas-service'; // 👈 Adicione este import
import { Lista } from '../../model/Lista'; // 👈 Adicione este import




@Component({
  selector: 'app-detalhelista',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './detalhelista.html',
  styleUrl: './detalhelista.scss',
})
export class Detalhelista implements OnInit {
  public listaProdutos: Produto[] = [];
  public novoProduto: Produto;
  public novoItem: ItemLista;
  public formNovoProduto: boolean = false;
  public idLista: number = 0;
  public listaCompras: Lista = new Lista(); // 👈 NOVA PROPRIEDADE
  public itensDaLista: ItemLista[] = []; // 👈 **ADICIONE ESTA PROPRIEDADE**

  constructor(
    private produtoService: ProdutosService,
    private activateRoute: ActivatedRoute,
    private itemListaService: ItensListaService,
    private listasService: ListasService // 👈 Adicione no constructor

  ) {
    this.novoProduto = new Produto();
    this.novoItem = new ItemLista();

  }

  ngOnInit(): void {
     // CORREÇÃO: Recuperar o ID no ngOnInit usando subscribe
    this.activateRoute.params.subscribe(params => {
      this.idLista = +params['id']; // O '+' converte string para número
      console.log("ID da lista recuperado:", this.idLista);
      this.recuperarTodosProdutos();
      this.recuperarDetalhesLista(this.idLista); // 👈 CHAMA O NOVO MÉTODO
      this.recuperarItensDaLista(this.idLista); // 👈 **CHAME ESTE NOVO MÉTODO**
    });

  }

// 👈 **ADICIONE ESTE NOVO MÉTODO**
  public recuperarItensDaLista(idLista:number) {
    this.itemListaService.recuperarItensPorLista(idLista).subscribe({
      next: (res: ItemLista[]) => {
        this.itensDaLista = res;
        console.log('Itens da lista carregados:', this.itensDaLista);
      },
      error: (err) => {
        console.error('Erro ao recuperar itens da lista:', err);
        alert('Erro ao carregar itens da lista.');
      },
    });
  }




   // 👈 NOVO MÉTODO PARA RECUPERAR DETALHES DA LISTA
  public recuperarDetalhesLista(idLista:number) {
    this.listasService.recuperarListaPorId(idLista).subscribe({
      next: (res: Lista) => {
        this.listaCompras = res;
        console.log('Detalhes da lista carregados:', this.listaCompras);
      },
      error: (err) => {
        console.error('Erro ao recuperar detalhes da lista:', err);
        alert('Erro ao carregar detalhes da lista.');
      },
    });
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

    // Cria uma cópia do objeto sem o numSeq
    const itemParaEnviar = this.removerNumSeq(this.novoItem);
    // Atribui o ID da lista
    itemParaEnviar.lista = { id: this.idLista } as any;
    console.log('Adicionando item à lista ID:', this.idLista, 'Item:', itemParaEnviar);

    // Aqui você pode chamar um serviço para salvar o item na lista específica
    this.itemListaService.adicionarNovoItem(itemParaEnviar).subscribe({
      next: (res: ItemLista) => {
        alert('Item adicionado à lista com sucesso!');
        // Reseta o formulário do novo item
        this.novoItem = new ItemLista();
        this.recuperarItensDaLista(this.idLista); // 👈 **RECARREGA OS ITENS APÓS ADICIONAR**
      },
      error: (err) => {
        alert('Erro ao adicionar item à lista.');
      },
    });
  }
     // NOVO MÉTODO - Remove o numSeq do ItemLista (similar ao removerId do Produto)
    private removerNumSeq(item: ItemLista): any {
    const { numSeq, ...itemSemNumSeq } = item;
    return itemSemNumSeq;
  }

  }


