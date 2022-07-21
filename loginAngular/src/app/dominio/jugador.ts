import { Disciplina } from "./disciplina"
import { Facultad } from "./facultad"
import { Nacionalidad } from "./nacionalidad"

export class Jugador {
    id: number
    nombre: string
    apellido: string
    dni: number
    fechaNacimiento: Date
    facultad: Facultad
    nacionalidad: String
    disciplina: Disciplina
    apellidoNombre: string
    fechaFormat:string
    telefono:string
    legajo:string
    email:string

    constructor(nombre: string,apellido: string,dni: number, facultad: Facultad, nacionalidad:String, disciplina:Disciplina, fecha:Date,id:number, apellidoNombre:string, fechaFormat:string, telefono:string, legajo:string, email:string){
        this.id=id
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.fechaNacimiento = fecha
        this.facultad = facultad
        this.nacionalidad = nacionalidad
        this.disciplina = disciplina
        this.apellidoNombre =apellidoNombre
        this.fechaFormat = fechaFormat
        this.email=email
        this.legajo=legajo
        this.telefono=telefono
    }
}
