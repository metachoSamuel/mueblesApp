import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProyectoService} from "../../services/proyecto.service";

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {
  constructor(private servi: ProyectoService) { }

  Proyectos: any = [];
  TituloProyectos = "";
  TablaProyecto: any = [];

  TituloProyecto = "";
  MiProyecto: any = [];
  TabBusProyecto: any = [];
  comboListaProyecto: any = [];

  title = "Manejo Proyectos";
  controlLista = 1;
  buscarEvalor = 1;

  mostrarCrear: boolean = false;
  mostrarActualizar: boolean = false;

  ListaProyectos = new FormGroup({});
  filtrarProyectos = new FormGroup({
    combofiltro: new FormControl()
  });

  formularioCrear = new FormGroup({
    id_tipo_material: new FormControl('', Validators.required),
    id_produccion: new FormControl('', Validators.required),
    descrip_proyecto: new FormControl('', Validators.required),
  });

  formularioActualizar = new FormGroup({
    id_proyecto: new FormControl(),
    id_tipo_material: new FormControl('', Validators.required),
    id_produccion: new FormControl('', Validators.required),
    descrip_proyecto: new FormControl('', Validators.required),
  });

  public mostrarHtml(op: any) {
    if (op == 1) {
      this.mostrarCrear = !this.mostrarCrear;
    } else {
      this.mostrarActualizar = !this.mostrarActualizar;
    }
  }

  public async crearProyecto() {
    var dataPersona = this.formularioCrear.value;
    await this.servi.postProyecto(dataPersona);
    this.consultarProyecto(1);
  }

  public async buscarProyecto() {
    var filtrovalor = this.filtrarProyectos.getRawValue()['combofiltro'];
    if (this.controlLista == 1) {
      this.MiProyecto = await this.servi.getProyecto('/' + filtrovalor);
      this.TituloProyecto = "Persona Seleccionada";
      this.TabBusProyecto = ["Indicador", "Apellidos", "Nombres", "Número de documento", "Tipo de usuario"];
    } else {
      this.MiProyecto = null;
      this.TituloProyecto = "";
      this.TabBusProyecto = [];
      this.controlLista = 1;
    }
  }

  //Actualizar persona
  public actualizarProyecto() {
    var dataPersona = this.formularioActualizar.value
    this.servi.updateProyecto(dataPersona)
  }

  public async consultarProyecto(op: any) {
    if (this.controlLista == 1) {
      this.Proyectos = await this.servi.getProyectos();
      if (op == 1) {
        this.TituloProyectos = "Listar Proyectos";
        this.TablaProyecto = ["Indicador", "Descripcion", "Carac", "fecha prod", "horas trab", "Costos", "descrip prod", "cantidad", "tipo material"];
      } else if (op == 2) {
        this.comboListaProyecto = this.Proyectos;
        this.MiProyecto = null;
        this.TituloProyectos = "";
        this.TablaProyecto = [];
      }
    } else {
      this.Proyectos = null;
      this.TituloProyectos = "";
      this.TablaProyecto = [];
      this.controlLista = 1;
    }
  }

  public limpiarLista() {
    this.controlLista = 0;
  }
}
