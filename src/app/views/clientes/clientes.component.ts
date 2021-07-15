import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesServiceService } from 'src/app/services/clientes-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:any[] = [];
  data: any;
  constructor(private router: Router, private clienteService:ClientesServiceService) { 
      clienteService.obtenerUsuarios().subscribe((data:any) =>{
         this.clientes = data
      })
   }

  ngOnInit(): void {
  }

  show = (cliente) =>{
    (document.getElementById("id") as HTMLInputElement).value = cliente['id'];
    (document.getElementById("nombre") as HTMLInputElement).value = cliente['nombre'];
    (document.getElementById("apellido") as HTMLInputElement).value = cliente['apellido'];
    (document.getElementById("cedula") as HTMLInputElement).value = cliente['cedula'];
    (document.getElementById("direccion") as HTMLInputElement).value = cliente['direccion'];
    (document.getElementById("celular") as HTMLInputElement).value = cliente['celular'];
    (document.getElementById("correo") as HTMLInputElement).value = cliente['correo'];
    (document.getElementById("p") as HTMLInputElement).value = cliente['contrasena'];
  }

  crear = () =>{
    this.data =
      {
        "nombre" : (document.getElementById("nombre") as HTMLInputElement).value ,
        "apellido": (document.getElementById("apellido") as HTMLInputElement).value  ,
        "correo" : (document.getElementById("correo") as HTMLInputElement).value,
        "cedula" : (document.getElementById("cedula") as HTMLInputElement).value,
        "direccion" : (document.getElementById("direccion") as HTMLInputElement).value,
        "celular" : (document.getElementById("celular") as HTMLInputElement).value,
        "contrasena" :(document.getElementById("contraseña") as HTMLInputElement).value,
        "rol" : "cliente"
      }
    
    this.clienteService.crearCliente(this.data).subscribe((data) =>{
      this.router.navigateByUrl("area");
      window.location.reload()
    })
  }


  editar = () =>{
    this.data =
      {
        "id": (document.getElementById("id") as HTMLInputElement).value,
        "nombre" : (document.getElementById("nombre") as HTMLInputElement).value ,
        "apellido": (document.getElementById("apellido") as HTMLInputElement).value  ,
        "correo" : (document.getElementById("correo") as HTMLInputElement).value,
        "cedula" : (document.getElementById("cedula") as HTMLInputElement).value,
        "direccion" : (document.getElementById("direccion") as HTMLInputElement).value,
        "celular" : (document.getElementById("celular") as HTMLInputElement).value,
        "contrasena" :(document.getElementById("p") as HTMLInputElement).value,
        "rol" : "cliente"
      
      }
    
    this.clienteService.crearCliente(this.data).subscribe((data) =>{
      this.router.navigateByUrl("clientes");
      window.location.reload()
    })
  }

  eliminar =(cliente) =>{
     this.clienteService.eliminarCliente(cliente['id']).subscribe((data) =>{
      window.location.reload()
     },(error) =>{
      window.location.reload()
     })
  }
  

}
