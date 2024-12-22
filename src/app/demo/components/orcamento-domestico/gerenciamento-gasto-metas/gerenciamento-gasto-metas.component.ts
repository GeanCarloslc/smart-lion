import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    templateUrl: './gerenciamento-gasto-metas.component.html',
    providers: [MessageService, ConfirmationService]
})
export class GerenciamentoGastoMetasComponent implements OnInit {
  

  constructor(private router: Router) {}
  
  ngOnInit(): void {

  }

  navegarParaGasto() {
    this.router.navigate(['/orcamento-domestico/recursos-usuario/gasto']);
  }

  navegarParaMetaGasto() {
    this.router.navigate(['/orcamento-domestico/recursos-usuario/meta-gasto']);
  }
}
