import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecursosUsuarioComponent } from './recursos-usuario.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RecursosUsuarioComponent }
	])],
	exports: [RouterModule]
})
export class RecursosUsuarioRoutingModule { }
