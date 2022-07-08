import { NacionalidadesService } from "../servicios/nacionalidades.service"
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
    nacionalidad: Nacionalidad
    disciplina: Disciplina

    constructor(nombre: string,apellido: string,dni: number, facultad: Facultad, nacionalidad:Nacionalidad, disciplina:Disciplina, fecha:Date,id:number){
        this.id=id
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.fechaNacimiento = fecha
        this.facultad = facultad
        this.nacionalidad = nacionalidad
        this.disciplina = disciplina
    }

    public getNombreApellido(): string{
        return this.apellido + ' ' + this.nombre
    }
}
