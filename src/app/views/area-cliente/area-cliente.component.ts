import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-area-cliente',
  templateUrl: './area-cliente.component.html',
  styleUrls: ['./area-cliente.component.css']
})
export class AreaClienteComponent implements OnInit {

  libros: any[] = [];
  selecionados: any[] = [];
  delete: any;
  datos: any;
  reservasMe: any[] = [];
  data :any
  constructor(private librosService: LibrosService, private router: Router) { }

  ngOnInit(): void {
    this.list()
    this.librosService.obtenerReservas().subscribe((reservas: any) => {
      reservas.forEach(element => {
        if (element['clientesModel']['id'] == localStorage.getItem('cliente_id')) {
          this.reservasMe[(this.reservasMe.length - 1) + 1] = element
        }
      });
    })
  }

  list = () => {
    this.librosService.obtenerLibros().subscribe((libros: any) => {
      this.libros = libros
    })
  }

  selecion = (libro) => {
    this.selecionados[(this.selecionados.length - 1) + 1] = libro;
    this.total();

  }

  total = () => {
    let total = 0;
    this.selecionados.forEach(element => {
      total = total + parseFloat(element['tarifa']);
    });
    (document.getElementById("total") as HTMLInputElement).value = String(total);
  }

  eliminar = (libro) => {
    this.delete = this.selecionados.indexOf(libro)
    this.selecionados.splice(this.delete)
    this.total();
  }

  reservar = () => {
    let date: Date = new Date();
    this.selecionados.forEach(element => {
      if ((parseInt(element['cantidad'])) > 0) {
        this.datos = {
          "fechaAlquiler": date,
          "fechaDevolucion": (document.getElementById("fd") as HTMLInputElement).value,
          "tarifaTotal": parseFloat((document.getElementById("total") as HTMLInputElement).value),
          "librosModel": {
            "id": element['id']
          },
          "clientesModel": {
            "id": localStorage.getItem('cliente_id')
          }
        }
        this.librosService.reservar(this.datos).subscribe((data) => {
          console.log(data)
          this.data =
          {
            "id": element['id'],
            "nombre": element['nombre'],
            "descripcion": element['descripcion'],
            "cantidad": parseInt(element['cantidad']) -1,
            "tarifa": element['tarifa']
          }

          this.librosService.crearLibro(this.data).subscribe((data) => {
            console.log("Reserva Ok");
            (document.getElementById("alertas") as HTMLElement).hidden = false;
            (document.getElementById("alertas") as HTMLElement).innerHTML = "Reserva Registrada";
          })

        })
      } else {
        (document.getElementById("alertasE") as HTMLElement).hidden = false;
        (document.getElementById("alertasE") as HTMLElement).innerHTML = "Libro sin cantidad";
      }
    });



  }

}
