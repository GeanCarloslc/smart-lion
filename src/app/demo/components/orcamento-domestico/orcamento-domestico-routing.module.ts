import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'recursos-usuario', data: { breadcrumb: 'RecursosUsuario' }, loadChildren: () => import('./recursos-usuario/recursos-usuario.module').then(m => m.RecursosUsuarioModule) },
        { path: 'gerenciamento-gasto-metas', data: { breadcrumb: 'GerenciamentoGastoMetas' }, loadChildren: () => import('./gerenciamento-gasto-metas/gerenciamento-gasto-metas.module').then(m => m.GerenciamentoGastoMetasModule) },
        { path: 'meta-gasto', data: { breadcrumb: 'MetaGasto' }, loadChildren: () => import('./gerenciamento-gasto-metas/meta-gasto/meta-gasto.module').then(m => m.MetaGastoModule) },
        { path: 'gasto', data: { breadcrumb: 'Gasto' }, loadChildren: () => import('./gerenciamento-gasto-metas/gasto/gasto.module').then(m => m.GastoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class OrcamentoDomesticoRoutingModule { }
