import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMarcaComponent } from './components/crear-marca/crear-marca.component';
import { ListarMarcasComponent } from './components/listar-marcas/listar-marcas.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { TiendaComponent } from './components/tienda/tienda.component';

const routes: Routes = [
  { path: '', component: TiendaComponent },
  { path: 'crear-marca', component: CrearMarcaComponent },
  { path: 'listar-marcas', component: ListarMarcasComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'listar-productos', component: ListarProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
