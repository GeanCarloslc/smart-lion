import { CategoriaGasto } from "./CategoriaGasto";

export interface MetaGasto {
    id?: Number;
    categoriaGastoDto?: CategoriaGasto;
    recursosUsuarioId?: Number;
    valorMeta?: Number;
}