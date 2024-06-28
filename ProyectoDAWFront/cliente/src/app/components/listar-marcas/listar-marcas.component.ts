import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-listar-marcas',
  templateUrl: './listar-marcas.component.html',
  styleUrls: ['./listar-marcas.component.css']
})
export class ListarMarcasComponent implements OnInit {
  marcas: Marca[] = [];
  marcaEditada: Marca = { id: 0, name: '' };

  constructor(
    private marcaService: MarcaService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
    });
  }

  editarMarca(marca: Marca, content: any) {
    this.marcaEditada = { ...marca };
    this.modalService.open(content, { centered: true });
  }

  guardarCambios() {
    this.marcaService.actualizarMarca(this.marcaEditada).subscribe(() => {
      this.cargarMarcas();
      this.modalService.dismissAll();
    });
  }

  eliminarMarca(id: number) {
    if (confirm('¿Estás seguro de querer eliminar esta marca?')) {
      this.marcaService.eliminarMarca(id).subscribe(() => {
        this.cargarMarcas();
      });
    }
  }
}
