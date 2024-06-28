import { Component } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent {
  marca: Marca = { id: 0, name: '' };

  constructor(private marcaService: MarcaService) { }

  onSubmit() {
    this.marcaService.createMarca(this.marca).subscribe(() => {
      // Limpiar el objeto marca para limpiar el formulario
      this.marca = { id: 0, name: '' };
    });
  }
}
