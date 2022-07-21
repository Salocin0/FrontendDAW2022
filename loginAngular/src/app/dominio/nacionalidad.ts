export class Nacionalidad {
    //atributos
    id:number
    nombre: string
    codigo: string
    descripcion: string
    //constructor
    constructor(nombre: string,codigo:string,descripcion:string,id:number){
        this.id=id
        this.nombre = nombre
        this.codigo = codigo
        this.descripcion=descripcion
    }
}