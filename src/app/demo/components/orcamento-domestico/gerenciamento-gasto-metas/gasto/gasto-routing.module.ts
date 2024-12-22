import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GastoComponent } from './gasto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GastoComponent }
	])],
	exports: [RouterModule]
})
export class GastoRoutingModule { }
