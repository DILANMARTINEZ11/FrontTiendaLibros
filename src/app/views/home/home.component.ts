import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesServiceService } from 'src/app/services/clientes-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private Clientesservice: ClientesServiceService, private router: Router) { }

  ngOnInit(): void {

  }

  Login = () => {
    this.Clientesservice.obtenerUsuarios().subscribe((clientes: any) => {
      var i = 0;
      var rol = "";
      var id ="";
      clientes.forEach(cliente => {
        if ((document.getElementById('correo') as HTMLInputElement).value == cliente['correo'] && (document.getElementById('psw') as HTMLInputElement).value == cliente['contrasena']) {
          i++;
          rol = cliente['rol']
          id = cliente['id'];
        }
      });
      if (i > 0) {
        if (rol == "cliente") {
          localStorage.setItem('cliente_id', id );
          this.router.navigateByUrl("area");
        } else if (rol == "admin") {
          this.router.navigateByUrl("dashboard");
        }
      } else {
        (document.getElementById("alerta") as HTMLDivElement).hidden = false;
        (document.getElementById("alerta") as HTMLDivElement).innerText = "Correo o Contraseña Invalida"
      }
    })
  }

  registro = () =>{
    this.data =
    {
      "nombre" : (document.getElementById("nombreC") as HTMLInputElement).value ,
      "apellido": (document.getElementById("apellidoC") as HTMLInputElement).value  ,
      "correo" : (document.getElementById("correoC") as HTMLInputElement).value,
      "cedula" : (document.getElementById("cedulaC") as HTMLInputElement).value,
      "direccion" : (document.getElementById("direccionC") as HTMLInputElement).value,
      "celular" : (document.getElementById("celularC") as HTMLInputElement).value,
      "contrasena" :(document.getElementById("contrasenaC") as HTMLInputElement).value,
      "rol" : "cliente"
    }
  
  this.Clientesservice.crearCliente(this.data).subscribe((data) =>{
    this.router.navigateByUrl("/");
    window.location.reload()
  })
  }

}
