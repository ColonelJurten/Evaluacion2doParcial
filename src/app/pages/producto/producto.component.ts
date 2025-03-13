import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  // 📌 PROPIEDADES
  productos: any;
  producto = new Producto();

  constructor(private productoService: ProductoService) {
    this.getProductos();
  }

  // 📌 OBTENER LISTA DE PRODUCTOS
  async getProductos(): Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }

  // 📌 INSERTAR NUEVO PRODUCTO
  insertarProducto() {
    if (!this.validarFormulario()) return;
    this.productoService.agregarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  // 📌 SELECCIONAR UN PRODUCTO PARA MODIFICACIÓN
  selectProducto(productoSeleccionado: Producto) {
    this.producto = productoSeleccionado;
  }

  // 📌 MODIFICAR UN PRODUCTO
  updateProducto() {
    if (!this.validarFormulario()) return;
    this.productoService.modificarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  // 📌 ELIMINAR UN PRODUCTO
  deleteProducto() {
    this.productoService.eliminarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  // 📌 VALIDAR FORMULARIO ANTES DE GUARDAR
  validarFormulario(): boolean {
    return (
      this.producto.nombre?.trim() !== '' &&
      this.producto.descripcion?.trim() !== '' &&
      this.producto.costo !== null &&
      this.producto.costo !== undefined &&
      this.producto.costo > 0
    );
  }
}
