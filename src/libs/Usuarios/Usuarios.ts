export interface IUsuario {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: string;
    created?: Date;
    ultimoacceso?: Date;
 
}
export class Usuarios {
    private usuarios : IUsuario[];
    constructor(){
        this.usuarios = [];
    }
    getAll(){
        return this.usuarios;
    }
    getById (codigo: string){
        const usuarioToReturn = this.usuarios.filter((usu)=>{
            return usu.codigo === codigo;
        });
        return usuarioToReturn;
    }
    add(nuevoUsuario : IUsuario) {
        const date = new Date();
        const nueva: IUsuario = {
            ...nuevoUsuario,
            codigo:(Math.random()* 1000).toString()+new Date().getTime().toString(),
            created: date,
            ultimoacceso: date
        }
        this.usuarios.push(nueva);
        return true;
    }
    update(updateUusario: IUsuario){
        const newUsuarios: IUsuario[] = this.usuarios.map((usu)=>{
            if ( usu.codigo === updateUusario.codigo ){
                return{...usu, ...updateUusario, updated: new Date}
            }
            return usu;
        });
        this.usuarios = newUsuarios;
        return true;
    }
    delete(codigo: string){
        const usuarioToDelete = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });
        if(usuarioToDelete){
            const newUsuarios: IUsuario[] = this.usuarios.filter((usu)=>{
                return usu.codigo !== codigo;
            });
            this.usuarios = newUsuarios;
            return true;
        }
        return false;
    }
}