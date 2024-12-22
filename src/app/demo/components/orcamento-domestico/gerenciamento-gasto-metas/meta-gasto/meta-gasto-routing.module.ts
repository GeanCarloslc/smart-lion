import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGastoComponent } from './meta-gasto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MetaGastoComponent }
	])],
	exports: [RouterModule]
})
export class MetaGastoRoutingModule { }
