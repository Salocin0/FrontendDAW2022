export class Facultad {
    //atributos
    id:number
    nombre: string
    codigo: string
    codigoNumerico: string
    //constructor
    constructor(nombre: string,codigo:string,codigoNumerico:string,id:number){
        this.id=id
        this.nombre = nombre
        this.codigo = codigo
        this.codigoNumerico=codigoNumerico
    }
}