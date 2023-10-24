import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable, of} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //-------------------------Proyecto-------------------------
  //Listar proyecto (CRUL)
  async getProyectos(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.Url}/proyecto`, httpOptions));
  }

  //Leer proyecto (CRUL)
  async getProyecto(id: any): Promise<any> {
    return firstValueFrom(this.http.get(`${this.Url}/proyecto/${id}`, httpOptions));
  }

  //Crear proyecto (CRUL)
  async postProyecto(data: {}): Promise<any> {
    return firstValueFrom(this.http.post(`${this.Url}/proyecto`, data, httpOptions));
  }

  //Actualizar proyecto (CRUL)
  async updateProyecto(data: {}): Promise<any> {
    return firstValueFrom(this.http.put(`${this.Url}/proyecto`, data, httpOptions));
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
