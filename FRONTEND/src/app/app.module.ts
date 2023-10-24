import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { PersonaComponent } from './pages/persona/persona.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { PersonaService } from "./services/persona.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import { ProyectoComponent } from './pages/proyecto/proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    PersonaComponent,
    ProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
