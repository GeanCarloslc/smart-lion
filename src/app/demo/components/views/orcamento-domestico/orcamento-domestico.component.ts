import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { Estoque } from 'src/app/demo/model/Estoque';
import { RecursoUsuarioService } from 'src/app/demo/service/recursoUsuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RecursoUsuario } from 'src/app/demo/model/RecursoUsuario';
import { Page } from 'src/app/demo/model/Page';

@Component({
    templateUrl: './orcamento-domestico.component.html',
    providers: [MessageService, ConfirmationService]
})
export class OrcamentoDomesticoComponent implements OnInit {

    countries: any[] = [];

    value1: any;

    value2: any;

    value3: any;

    value4: any;

    value5: any;

    value6: any;

    value7: any;

    value8: any;

    value9: any;

    value10: any;

    productDialog: boolean = false;

    submitted: boolean = false;

    loading: boolean = false;

    activityValues: number[] = [0, 100];

    representatives: Representative[] = [];

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    products: Product[] = [];

    estoqueLista: Estoque[] = [];

    recursoUsuarioPaginado!: Page<RecursoUsuario>;

    statuses: any[] = [];

    constructor(
                private customerService: CustomerService, 
                private recursoUsuarioService: RecursoUsuarioService,
                private productService: ProductService,
                private messageService: MessageService, 
                private confirmationService: ConfirmationService
                ) { }

    ngOnInit() {
        this.buscarRecursosUsuario({ first: 0, rows: 10 }); // Carregar dados da primeira página
    }

    buscarRecursosUsuario(event: any): void {
        const page = Math.floor(event.first / event.rows);
        const size = event.rows;
        const sortField = event.sortField || 'id';
        const sortOrder = event.sortOrder === -1 ? 'desc' : 'asc';
        const sort = `${sortField},${sortOrder}`;
    
        this.recursoUsuarioService.buscarTodos('teste', page, size, sort).subscribe({
          next: (data) => {
            this.recursoUsuarioPaginado = data;
          },
          error: (err) => {
            console.error('Erro ao carregar recursos:', err);
            this.recursoUsuarioPaginado = {
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
          }
        });
      }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
    }

    openNew() {
        // this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {

    }

    deleteProduct(any: any) {

    }

    editProduct(any: any){

    }

    getSeverity(status: string) {
        return "";
        
    }

    saveProduct() {

    }
    
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
}
