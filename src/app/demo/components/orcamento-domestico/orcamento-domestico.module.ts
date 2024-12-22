import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcamentoDomesticoRoutingModule } from './orcamento-domestico-routing.module'
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
	imports: [
		CommonModule,
		OrcamentoDomesticoRoutingModule,
		ToastModule,
    	ToolbarModule
	]
})
export class OrcamentoDomesticoModule { }
