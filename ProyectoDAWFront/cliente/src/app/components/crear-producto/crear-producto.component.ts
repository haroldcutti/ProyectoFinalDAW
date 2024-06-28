import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  producto: Producto = { id: 0, brand: 0, model: '', price: 0, year: 0, image: '' };
  marcas: Marca[] = [];
  mensajeError: string = '';
  selectedFile: File | null = null;

  constructor(private productoService: ProductoService, private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
    });
  }

  onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('brand', String(this.producto.brand));
    formData.append('model', this.producto.model);
    formData.append('price', String(this.producto.price));
    formData.append('year', String(this.producto.year));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productoService.createProducto(formData).subscribe(
      response => {
        console.log('Producto creado:', response);
        this.mensajeError = '';
        this.producto = { id: 0, brand: 0, model: '', price: 0, year: 0, image: '' };
        this.selectedFile = null;
      },
      error => {
        console.error('Error al crear el producto:', error);
        this.mensajeError = 'Error al crear el producto. Verifique los datos ingresados.';
      }
    );
  }
}
