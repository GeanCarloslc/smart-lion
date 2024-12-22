import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GerenciamentoGastoMetasComponent } from './gerenciamento-gasto-metas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GerenciamentoGastoMetasComponent }
	])],
	exports: [RouterModule]
})
export class GerenciamentoGastoMetasRoutingModule { }
