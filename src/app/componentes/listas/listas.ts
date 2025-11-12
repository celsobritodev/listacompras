import { Component, OnInit } from '@angular/core';
import { ListasService } from '../../servicos/listas-service';
import { Lista } from '../../model/Lista';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listas.html',
  styleUrl: './listas.scss',
})
export class Listas implements OnInit {
  public listas: Lista[] = [];
  public novaLista: Lista;

  constructor(private service: ListasService) {
    this.novaLista = new Lista();
  }

  ngOnInit(): void {
    this.getAllListas();
  }

  public getAllListas() {
    this.service.recuperarListas().subscribe({
      next: (res: Lista[]) => {
        this.listas = res;

        console.log('Listas carregadas:', this.listas);

        // Debug: verifique os dados
        this.listas.forEach((item) => {
          console.log('Item:', {
            id: item.id,
            data: item.data,
            tipoData: typeof item.data,
            nome: item.nomeMercado,
          });
        });
      },
      error: (err) => {
        alert('Erro ao recuperar listas de compras.');
      },
    });
  }

  public cadastrarLista() {
    // Cria uma cópia do objeto sem o ID
    const listaParaEnviar = this.removerId(this.novaLista);

    console.log('Enviando dados:', listaParaEnviar);

    this.service.cadastrarLista(listaParaEnviar).subscribe({
      next: (res: Lista) => {
        alert('Nova Lista cadastrada');
        this.getAllListas();
        this.fecharModal();
      },
      error: (err) => {
        alert('Erro ao recuperar listas de compras.');
      },
    });
  }

  // ADICIONE ESTE MÉTODO NOVO:
  private fecharModal() {
    // Remove o foco do botão atual primeiro
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  private removerId(lista: Lista): any {
    const { id, ...listaSemId } = lista;
    return listaSemId;
  }

  limparFormulario() {
    this.novaLista = new Lista();
  }
}
