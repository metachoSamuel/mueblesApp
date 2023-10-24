import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { PersonaService } from "../../services/persona.service";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  constructor(private servi: PersonaService) { }

  Personas: any = [];
  TituloPersonas = "";
  TablaPersona: any = [];

  TituloPersona = "";
  MiPersona: any = [];
  TabBusPersona: any = [];
  comboListaPersona: any = [];
  comboListaDoc: any = [{'id_tipo_doc': 1, 'documento': 'cedula'},{'id_tipo_doc': 2, 'documento': 'extranjeria'}];
  comboListaEps: any = [{'id_eps': 1, 'nombre_eps': 'Compensar'},{'id_eps': 2, 'nombre_eps': 'Famisanar'}];
  comboListaArl: any = [{'id_arl': 1, 'nombre_arl': 'Sura'}];
  comboListaPension: any = [{'id_pension': 1, 'nombre_pension': 'Colpensiones'}];

  title = "Manejo personas";
  controlLista = 1;
  buscarEvalor = 1;

  mostrarCrear: boolean = false;
  mostrarActualizar: boolean = false;

  ListaPersonas = new FormGroup({});
  filtrarPersona = new FormGroup({
    combofiltro: new FormControl()
  });

  formularioCrear = new FormGroup({
    nombre_1: new FormControl('', Validators.required),
    nombre_2: new FormControl('', Validators.required),
    apellido_1: new FormControl('', Validators.required),
    apellido_2: new FormControl('', Validators.required),
    id_tipo_doc: new FormControl('', Validators.required),
    nu_documento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    cargo_persona: new FormControl('', Validators.required),
    id_eps_persona: new FormControl('', Validators.required),
    id_arl_persona: new FormControl('', Validators.required),
    id_pension_persona: new FormControl('', Validators.required)
  });

  formularioActualizar = new FormGroup({
    id_persona: new FormControl(),
    nombre_1: new FormControl('',Validators.required),
    nombre_2: new FormControl('',Validators.required),
    apellido_1: new FormControl('',Validators.required),
    apellido_2: new FormControl('',Validators.required),
    nu_documento: new FormControl('',Validators.required)
  });

  public mostrarHtml(op: any) {
    if (op == 1) {
      this.mostrarCrear = !this.mostrarCrear;
    } else {
      this.mostrarActualizar = !this.mostrarActualizar;
    }
  }

  public async crearPersona() {
    var dataPersona = this.formularioCrear.value;
    await this.servi.postPersona(dataPersona);
    this.consultarPersona(1);
  }

  public async buscarPersona() {
    var filtrovalor = this.filtrarPersona.getRawValue()['combofiltro'];
    if (this.controlLista == 1) {
      this.MiPersona = await this.servi.getPersona('/' + filtrovalor);
      this.TituloPersona = "Persona Seleccionada";
      this.TabBusPersona = ["Indicador", "Apellidos", "Nombres", "Número de documento", "Tipo de usuario"];
    } else {
      this.MiPersona = null;
      this.TituloPersona = "";
      this.TabBusPersona = [];
      this.controlLista = 1;
    }
  }

  //Actualizar persona
  public actualizarPersona() {
    var dataPersona = this.formularioActualizar.value
    this.servi.updatePersona(dataPersona)
  }

  public async consultarPersona(op: any) {
    if (this.controlLista == 1) {
      this.Personas = await this.servi.getPersonas();
      if (op == 1) {
        this.TituloPersonas = "Listar Personas";
        this.TablaPersona = ["Indicador", "Apellidos", "Nombres", "Número de documento"];
      } else if (op == 2) {
        this.comboListaPersona = this.Personas;
        this.MiPersona = null;
        this.TituloPersonas = "";
        this.TablaPersona = [];
      }
    } else {
      this.Personas = null;
      this.TituloPersonas = "";
      this.TablaPersona = [];
      this.controlLista = 1;
    }
  }

  public limpiarLista() {
    this.controlLista = 0;
  }
}
