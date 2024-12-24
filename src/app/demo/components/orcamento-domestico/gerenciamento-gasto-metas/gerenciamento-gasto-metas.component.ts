import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    templateUrl: './gerenciamento-gasto-metas.component.html',
    providers: [MessageService, ConfirmationService]
})
export class GerenciamentoGastoMetasComponent implements OnInit {

  saldo: number = 0;
  
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.saldo = params['saldo'];
    });
  }

  navegarParaGasto() {
    this.router.navigate(['/orcamento-domestico/recursos-usuario/gasto']);
  }

  navegarParaMetaGasto() {
    this.router.navigate(['/orcamento-domestico/recursos-usuario/meta-gasto']);
  }

  voltar(){
    this.location.back();
  }
}
