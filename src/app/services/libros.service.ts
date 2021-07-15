import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  public baseUrl : String= 'https://tienda-alquiler-libros.herokuapp.com';

  constructor(private http: HttpClient) { }

  obtenerLibros =()=> {
    return this.http.get(`${this.baseUrl}/libros`)
  }

  crearLibro = (libro) =>{
    return this.http.post(`${this.baseUrl}/libros`,libro)
  }

  eliminarLibro = (id)=>{
     return this.http.delete(`${this.baseUrl}/libros/${id}`)
  }

  reservar = (data) =>{
    return this.http.post(`${this.baseUrl}/reservas`,data)
  }

  obtenerReservas =() =>{
    return this.http.get(`${this.baseUrl}/reservas`)
  }

}
