import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros: any[] = [];
  data: any;
  constructor(private librosService: LibrosService,private router: Router) { }

  ngOnInit(): void {
    this.librosService.obtenerLibros().subscribe((libros:any) => {
        this.libros = libros
    })
  }

  
  show = (libro) =>{
    (document.getElementById("id") as HTMLInputElement).value = libro['id'];
     (document.getElementById("nombre") as HTMLInputElement).value = libro['nombre'];
     (document.getElementById("descripcion") as HTMLInputElement).value = libro['descripcion'];
     (document.getElementById("cantidad") as HTMLInputElement).value = libro['cantidad'];
     (document.getElementById("tarifa") as HTMLInputElement).value = libro['tarifa'];
  }

  crear = () =>{
    this.data =
      {
        "nombre" : (document.getElementById("nombreC") as HTMLInputElement).value ,
        "descripcion" : (document.getElementById("descripcionC") as HTMLInputElement).value,
        "cantidad" : (document.getElementById("cantidadC") as HTMLInputElement).value ,
        "tarifa" : (document.getElementById("tarifaC") as HTMLInputElement).value
      }
    
    this.librosService.crearLibro(this.data).subscribe((data) =>{
      this.router.navigateByUrl("libros");
      window.location.reload()
    })
  }


  editar = () =>{
    this.data =
      {
        "id": (document.getElementById("id") as HTMLInputElement).value,
        "nombre" : (document.getElementById("nombre") as HTMLInputElement).value ,
        "descripcion" : (document.getElementById("descripcion") as HTMLInputElement).value,
        "cantidad" : (document.getElementById("cantidad") as HTMLInputElement).value ,
        "tarifa" : (document.getElementById("tarifa") as HTMLInputElement).value
      }
    
    this.librosService.crearLibro(this.data).subscribe((data) =>{
      this.router.navigateByUrl("libros");
      window.location.reload()
    })
  }

  eliminar =(libro) =>{
     this.librosService.eliminarLibro(libro['id']).subscribe((data) =>{
      window.location.reload()
     },(error) =>{
      window.location.reload()
     })
  }


}
