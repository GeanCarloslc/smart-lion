import { Usuario } from "./Usuario";

export interface RecursosUsuario {
    id?: Number;
    usuarioDto: Usuario;
    renda: Number;
    data: Date;
}