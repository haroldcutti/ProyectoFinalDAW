import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../../services/producto.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];
  marcas: Marca[] = [];
  productoEditado: Producto = { id: 0, model: '', brand: 0, price: 0, year: 0, image: '' };
  selectedFile: File | null = null;

  constructor(
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarMarcas();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  cargarMarcas() {
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
    });
  }

  getBrandName(brandId: number): string {
    const brand = this.marcas.find(marca => marca.id === brandId);
    return brand ? brand.name : 'Desconocida';
  }

  editarProducto(producto: Producto, content: any) {
    this.productoEditado = { ...producto };
    this.selectedFile = null; 
    this.modalService.open(content, { centered: true });
  }

  guardarCambios() {
    if (this.selectedFile) {
      this.productoService.actualizarProducto(this.productoEditado, this.selectedFile).subscribe(() => {
        this.cargarProductos();
        this.modalService.dismissAll();
      });
    } else {
      this.productoService.actualizarProducto(this.productoEditado).subscribe(() => {
        this.cargarProductos();
        this.modalService.dismissAll();
      });
    }
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de querer eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}