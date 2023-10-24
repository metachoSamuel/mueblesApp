import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./pages/inicio/inicio.component";
import {PersonaComponent} from "./pages/persona/persona.component";
import {ProyectoComponent} from "./pages/proyecto/proyecto.component";

const routes: Routes = [
  { path:'inicio', component: InicioComponent  },
  { path:'persona', component: PersonaComponent  },
  { path:'proyecto', component: ProyectoComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
