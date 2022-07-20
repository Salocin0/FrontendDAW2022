export class Disciplina {
    //atributos
    id: number
    nombre: string
    codigo: string
    descripcion: String 
    //constructor
    constructor(nombre: string,codigo:string, id:number, descripcion:string){
        this.id=id
        this.nombre = nombre
        this.codigo = codigo
        this.descripcion=descripcion
    }
}
