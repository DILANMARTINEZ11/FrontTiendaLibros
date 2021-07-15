import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesServiceService {

   public baseUrl : String= 'https://tienda-alquiler-libros.herokuapp.com';

  constructor(private http: HttpClient) { }


  obtenerUsuarios =()=> {
      return this.http.get(`${this.baseUrl}/clientes`)
  }


  crearCliente = (cliente) =>{
    return this.http.post(`${this.baseUrl}/clientes`,cliente)
  }

  eliminarCliente = (id)=>{
     return this.http.delete(`${this.baseUrl}/clientes/${id}`)
  }


}
