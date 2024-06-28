import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8000/api/cars/'; // Ajusta según tu API Django

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  createProducto(productoData: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, productoData);
  }

  actualizarProducto(producto: Producto, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('id', String(producto.id));
    formData.append('brand', String(producto.brand));
    formData.append('model', producto.model);
    formData.append('price', String(producto.price));
    formData.append('year', String(producto.year));

    if (image) {
      formData.append('image', image, image.name);
    }

    const url = `${this.apiUrl}${producto.id}/`;
    return this.http.put(url, formData);
  }

  eliminarProducto(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url);
  }
}
