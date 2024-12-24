import { Component, OnInit, } from '@angular/core';
import { MetaGastoService } from 'src/app/demo/service/metaGasto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MetaGasto } from 'src/app/demo/model/MetaGasto';
import { Page } from 'src/app/demo/model/Page';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaGastoService } from 'src/app/demo/service/categoriaGasto.service';

@Component({
  selector: 'app-meta-gasto',
  templateUrl: './meta-gasto.component.html',
  providers: [MessageService, ConfirmationService]
})
export class MetaGastoComponent implements OnInit {

  recursosUsuarioId: number = 0;

  metaGastoDialog: boolean = false;

  submitted: boolean = false;

  loading: boolean = true;

  metaGasto: MetaGasto = {};

  metaGastoPaginado!: Page<MetaGasto>;

  metaGastoSelecionado: MetaGasto[] = [];

  categoriaGastoLista: any[] | undefined;;

  constructor(
    private metaGastoService: MetaGastoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriaGastoService: CategoriaGastoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recursosUsuarioId = params['id'];

    });
    this.buscarDadosDropdown();
    this.buscarMetaGasto({ first: 0, rows: 10 });
  }

  buscarMetaGasto(event: any): void {
    const page = Math.floor(event.first / event.rows);
    const size = event.rows;
    const sortField = event.sortField || 'id';
    const sortOrder = event.sortOrder === -1 ? 'desc' : 'asc';
    const sort = `${sortField},${sortOrder}`;
    this.loading = true;

    this.metaGastoService.buscarTodas(this.recursosUsuarioId, page, size, sort).subscribe({
      next: (data) => {
        this.metaGastoPaginado = data;
      },
      error: (err) => {
        console.error('Erro ao carregar metas de gasto:', err);
        this.metaGastoPaginado = {
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

  abrirDialog() {
    this.metaGasto = this.criarMetaGasto();
    this.submitted = false;
    this.metaGastoDialog = true;
  }

  excluirMetaGastoSeleciodados() {
    if (this.metaGastoSelecionado && this.metaGastoSelecionado.length) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir os itens selecionados?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.metaGastoService.excluir(this.metaGastoSelecionado).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Itens excluídos com sucesso!',
              });
              this.buscarMetaGasto({ first: 0, rows: 10 });
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
              this.metaGastoSelecionado = [];
            }
          });
        }
      });
    }
  }

  editarMetaGasto(metaGasto: MetaGasto) {
    this.metaGasto = { ...metaGasto };
    this.metaGastoDialog = true;
  }

  excluirMetaGasto(metaGasto: MetaGasto) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir essa meta de gasto?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.metaGastoService.excluir([metaGasto]).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `A Meta de gasto foi excluída com sucesso!`,
            });
            this.buscarMetaGasto({ first: 0, rows: 10 }); 
          },
          error: (error) => {
            console.error('Erro ao excluir meta de gasto:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Não foi possível excluir a meta de gasto.`,
            });
          }
        });
      }
    });
  }

  salvarMetaGasto(): void {
    this.submitted = true;
    this.loading = true;

    this.metaGastoService.salvar(this.metaGasto).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Meta de gasto salva com sucesso' });
        this.metaGastoDialog = false;
        this.buscarMetaGasto({ first: 0, rows: 10 });
      },
      error: (err) => {
        console.error('Erro ao salvar meta de gasto:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar a meta de gasto' });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  atualizarMetaGasto(): void {
    if (this.metaGasto.id) {
      this.loading = true;
      this.metaGastoService.atualizar(this.metaGasto.id, this.metaGasto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Meta de gasto atualizada com sucesso'
          });
          this.metaGastoDialog = false;
          this.buscarMetaGasto({ first: 0, rows: 10 });
        },
        error: (response) => {
          console.error('Erro ao atualizar meta de gasto:', response);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: response.error.message
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  fecharDialog() {
    this.metaGastoDialog = false;
    this.submitted = false;
  }

  criarMetaGasto(): MetaGasto {
    return {
      recursosUsuarioId: this.recursosUsuarioId,
      valorMeta: 0
    };
  }

  buscarDadosDropdown() {
    this.categoriaGastoService.buscarDadosDropdown().subscribe({
      next: (data) => {
        this.categoriaGastoLista = data;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias de gasto:', err);
      }
    });
  }

  salvarOuAtualizar() {
    if (this.metaGasto.id != null) {
      this.atualizarMetaGasto();
    } else {
      this.salvarMetaGasto();
    }
  }

}
