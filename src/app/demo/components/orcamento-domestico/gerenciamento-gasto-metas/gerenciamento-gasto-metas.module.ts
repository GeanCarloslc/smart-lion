import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GerenciamentoGastoMetasComponent } from './gerenciamento-gasto-metas.component';
import { GerenciamentoGastoMetasRoutingModule } from './gerenciamento-gasto-metas-routing.module';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';  // Importando o módulo Toast
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MetaGastoComponent } from './meta-gasto/meta-gasto.component';
import { GastoComponent } from './gasto/gasto.component';
import { GastoModule } from './gasto/gasto.module';
import { MetaGastoModule } from './meta-gasto/meta-gasto.module';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GerenciamentoGastoMetasRoutingModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    PasswordModule,
    InputTextareaModule,
    InputTextModule,
    TableModule,
    ProgressBarModule,
    SliderModule,
    ToastModule,
    ToolbarModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
	MetaGastoModule,
	GastoModule,
	TabViewModule,
	SplitterModule
  ],
  declarations: [
    GerenciamentoGastoMetasComponent,
  ]
})
export class GerenciamentoGastoMetasModule { }
