import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {firstValueFrom, Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //-------------------------Persona-------------------------
  //Listar Personas (CRUL)
  async getPersonas(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.Url}/persona`, httpOptions));
  }

  //Leer Persona (CRUL)
  async getPersona(id: any): Promise<any> {
    return firstValueFrom(this.http.get(`${this.Url}/persona/${id}`, httpOptions));
  }

  //Crear Persona (CRUL)
  async postPersona(data: {}): Promise<any> {
    return firstValueFrom(this.http.post(`${this.Url}/persona`, data, httpOptions));
  }

  //Actualizar Persona (CRUL)
  async updatePersona(data: {}): Promise<any> {
    return firstValueFrom(this.http.put(`${this.Url}/persona`, data, httpOptions));
  }

  // Manejo de errores y datos
  private extractData(res: Response) {
    let body = res.json(); // No es necesario el casting a cadena
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
