import {Component, OnInit, Input, Output} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  /**
   * Logica para el front de persona
   */

  Personas: any = [];

  TituloPersonas = "";
  TablaPersona: any = [];

  TituloPersona = "";
  MiPersona: any = [];
  TabBusPersona: any = [];
  comboListaPersona: any = [];

  title = "Manejo Asistencias";
  controlLista = 1;
  buscarEvalor = 1;

  //Control formularios
  mostrarCrear: boolean = false;
  mostrarActualizar: boolean = false;

  //FormGroup

  ListaPersonas = new FormGroup({});

  filtrarPersona = new FormGroup({
    combofiltro: new FormControl()
  });

  formularioCrear = new FormGroup({
    nombre_1: new FormControl('', Validators.required),
    nombre_2: new FormControl('', Validators.required),
    apellido_1: new FormControl('', Validators.required),
    apellido_2: new FormControl('', Validators.required),
    no_documento: new FormControl('', Validators.required),
    tipo_persona: new FormControl('', Validators.required)
  });

  formularioActualizar = new FormGroup({
    id_persona: new FormControl(),
    nombre_1: new FormControl('',Validators.required),
    nombre_2: new FormControl('',Validators.required),
    apellido_1: new FormControl('',Validators.required),
    apellido_2: new FormControl('',Validators.required),
    no_documento: new FormControl('',Validators.required),
    tipo_persona: new FormControl('',Validators.required)
  });



  constructor(
    private formBuilder: FormBuilder,
    private servi: PersonaService,
    Router: Router
  ) { }


  //Funcion para mostrar elementos en el html
  public mostrarHtml(op: any) {
    if (op == 1) {
      if (this.mostrarCrear) {
        this.mostrarCrear = false;
      } else {
        this.mostrarCrear = true;
      }
    } else {
      if (this.mostrarActualizar) {
        this.mostrarActualizar = false;
      } else {
        this.mostrarActualizar = true;
      }
    }
  }

  /**-----------CRUL---------------------------------- */
  //Crear
  public crearPersona() {
    var dataPersona = this.formularioCrear.value;
    this.servi.postPersona(dataPersona);

  }

  //Leer Persona
  public buscarPersona() {
    var filtrovalor = this.filtrarPersona.getRawValue()['combofiltro'];
    if (this.controlLista == 1) {
      this.servi.getPersona('/' + filtrovalor).subscribe((data: {}) => {
        this.MiPersona = data;
        this.TituloPersona = "Persona Seleccionada";
        this.TabBusPersona[0] = "Indicador";
        this.TabBusPersona[1] = "Apellidos";
        this.TabBusPersona[2] = "Nombres";
        this.TabBusPersona[3] = "numero de documento";
        this.TabBusPersona[4] = "Tipo de usuario";

      }, error => { console.error(error + " ") });
    } else {
      this.MiPersona = null;
      this.TituloPersona = "";
      this.TabBusPersona[0] = "";
      this.TabBusPersona[1] = "";
      this.TabBusPersona[2] = "";
      this.TabBusPersona[3] = "";
      this.TabBusPersona[4] = "";
      this.controlLista = 1;
    }
  }

  //Actualizar persona
  public actualizarPersona() {
    var dataPersona = this.formularioActualizar.value
    this.servi.updatePersona(dataPersona)
  }

  //Listar Personas
  public consultarPersona(op: any) {
    if (this.controlLista == 1) {
      this.servi.getPersonas().subscribe((data: any) => {
        if (op == 1) {
          this.Personas = data;
          console.log(data)
          this.TituloPersonas = "Listar Personas";
          this.TablaPersona[0] = "Indicador";
          this.TablaPersona[1] = "Apellidos";
          this.TablaPersona[2] = "Nombres";
          this.TablaPersona[3] = "numero de documento";
          this.TablaPersona[4] = "Tipo de usuario";
        } else if (op == 2) {
          this.comboListaPersona = data;
          this.MiPersona = null;
          this.TituloPersonas = "";
          this.TablaPersona[0] = "";
          this.TablaPersona[1] = "";
          this.TablaPersona[2] = "";
          this.TablaPersona[3] = "";
          this.TablaPersona[4] = "";
        }
      }, error => { console.error(error + " ") })
    } else {
      this.Personas = null;
      this.TituloPersonas = "";
      this.TablaPersona[0] = "";
      this.TablaPersona[1] = "";
      this.TablaPersona[2] = "";
      this.TablaPersona[3] = "";
      this.TablaPersona[4] = "";
      this.controlLista = 1;
    }
  }

  public limpiarLista() {
    this.controlLista = 0;
  }

  ngOnInit(): void {
  }

}
