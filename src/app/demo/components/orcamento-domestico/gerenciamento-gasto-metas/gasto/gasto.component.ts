import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { RecursosUsuarioService } from 'src/app/demo/service/recursosUsuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RecursosUsuario } from 'src/app/demo/model/RecursosUsuario';
import { Page } from 'src/app/demo/model/Page';
import { Usuario } from 'src/app/demo/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-gasto',
    templateUrl: './gasto.component.html',
    providers: [MessageService, ConfirmationService]
})
export class GastoComponent implements OnInit {

  id?: number;

  recursosUsuarioDialog: boolean = false;

  submitted: boolean = false;

  loading: boolean = true;

  recursosUsuario: RecursosUsuario = this.criarRecursosUsuario();

  recursosUsuarioPaginado!: Page<RecursosUsuario>;

  recursosUsuarioSelecionado: RecursosUsuario[] = [];

  statuses: any[] = [];

  constructor(
              private recursosUsuarioService: RecursosUsuarioService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        // Use o ID ou outros parâmetros como necessário
      });
      this.buscarRecursosUsuario({ first: 0, rows: 10 }); // Carregar dados da primeira página
  }

  buscarRecursosUsuario(event: any): void {
      const page = Math.floor(event.first / event.rows);
      const size = event.rows;
      const sortField = event.sortField || 'id';
      const sortOrder = event.sortOrder === -1 ? 'desc' : 'asc';
      const sort = `${sortField},${sortOrder}`;
      this.loading = true;

      this.recursosUsuarioService.buscarTodos(page, size, sort).subscribe({
        next: (data) => {
          this.recursosUsuarioPaginado = {
            content: [],
            totalElements: 0,
            pageable: {
              sort: { sorted: false, unsorted: true, empty: true },
              offset: 0,
              pageSize: 0,
              pageNumber: 0,
              paged: false,
              unpaged: true
            },
            totalPages: 0,
            last: true,
            size: 0,
            number: 0,
            sort: { sorted: false, unsorted: true, empty: true },
            numberOfElements: 0,
            first: true,
            empty: true
          };
        },
        error: (err) => {
          console.error('Erro ao carregar recursos:', err);
          this.recursosUsuarioPaginado = {
              content: [],
              totalElements: 0,
              pageable: {
                sort: { sorted: false, unsorted: true, empty: true },
                offset: 0,
                pageSize: 0,
                pageNumber: 0,
                paged: false,
                unpaged: true
              },
              totalPages: 0,
              last: true,
              size: 0,
              number: 0,
              sort: { sorted: false, unsorted: true, empty: true },
              numberOfElements: 0,
              first: true,
              empty: true
            };
        },
        complete: () => {
          this.loading = false;
        }
      });
    }

  openNew() {
      this.submitted = false;
      this.recursosUsuarioDialog = true;
  }

  excluirRecursosUsuarioSeleciodados() {
    if (this.recursosUsuarioSelecionado && this.recursosUsuarioSelecionado.length) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir os itens selecionados?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.recursosUsuarioService.excluir(this.recursosUsuarioSelecionado).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Itens excluídos com sucesso!',
              });
              this.buscarRecursosUsuario({ first: 0, rows: 10 });
            },
            error: (error) => {
              console.error('Erro ao excluir recursos:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Não foi possível excluir os itens selecionados.',
              });
            },
            complete: () => {
              this.recursosUsuarioSelecionado = [];
            }
          });
        }
      });
    }
  }

  editarRecursosUsuario(recursosUsuario: RecursosUsuario) {
    this.recursosUsuario = this.criarRecursosUsuario();
    this.recursosUsuario = { ...recursosUsuario };
    this.recursosUsuarioDialog = true;
}

excluirRecursosUsuario(recursosUsuario: RecursosUsuario) {
  this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o recurso de ${recursosUsuario.data}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.recursosUsuarioService.excluir([recursosUsuario]).subscribe({
              next: () => {
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Sucesso',
                      detail: `O Recurso de "${recursosUsuario.data}" foi excluído com sucesso!`,
                  });
                  this.buscarRecursosUsuario({ first: 0, rows: 10 }); // Atualiza a lista
              },
              error: (error) => {
                  console.error('Erro ao excluir produto:', error);
                  this.messageService.add({
                      severity: 'error',
                      summary: 'Erro',
                      detail: `Não foi possível excluir o recurso de "${recursosUsuario.data}".`,
                  });
              }
          });
      }
  });
}

  salvarRecursosUsuario(): void {
    this.submitted = true;
    this.loading = true;

    this.recursosUsuarioService.salvar(this.recursosUsuario).subscribe({
        next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Recurso salvo com sucesso' });
            this.recursosUsuarioDialog = false;
            this.buscarRecursosUsuario({ first: 0, rows: 10 });
        },
        error: (err) => {
            console.error('Erro ao salvar recurso:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar o recurso' });
        },
        complete: () => {
            this.loading = false;
        }
    });
}
  
  hideDialog() {
      this.recursosUsuarioDialog = false;
      this.submitted = false;
  }

  criarRecursosUsuario(): RecursosUsuario {
    let usuario: Usuario = { id: 1 };
      return {
        usuarioDto: usuario,
        renda: 0,
        data: new Date()
      };
  }

  direcionarParaTelaMetas(recursosUsuario: RecursosUsuario): void {
    const currentUrl = this.router.url; // Obtém a URL atual completa
    const basePath = currentUrl.split('/').slice(0, -1).join('/'); // Remove a última parte da URL
    this.router.navigate([`${basePath}/gerenciamento-gasto-metas`], {
        queryParams: { id: recursosUsuario.id }
    });
}
}
