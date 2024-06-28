import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];
  marcas: Marca[] = [];
  brandFilter: string = '';

  constructor(private productoService: ProductoService, private marcaService: MarcaService) { }

  ngOnInit() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
    });
  }

  getBrandName(brandId: number): string {
    const brand = this.marcas.find(marca => marca.id === brandId);
    return brand ? brand.name : 'Desconocida';
  }

  filterByBrand() {
    if (this.brandFilter) {
      return this.productos.filter(p => this.getBrandName(p.brand) === this.brandFilter);
    }
    return this.productos;
  }
}
