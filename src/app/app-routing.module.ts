import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaClienteComponent } from './views/area-cliente/area-cliente.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { LibrosComponent } from './views/libros/libros.component';



const routes: Routes = [
  {path: 'clientes', component: ClientesComponent },
  {path: '', component: HomeComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'area', component: AreaClienteComponent },
  {path: 'libros', component: LibrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
