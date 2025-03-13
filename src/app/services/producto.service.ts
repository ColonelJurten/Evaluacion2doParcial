import { inject, Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  // 📌 METODO PARA OBTENER TODOS LOS DOCUMENTOS DE LA COLECCIÓN
  getProductos() {
    const productosCollection = collection(this.db, 'productos');
    return collectionData(productosCollection, { idField: 'id' }).pipe(first());
  }

  // 📌 METODO PARA AGREGAR UN NUEVO DOCUMENTO
  agregarProducto(producto: Producto) {
    const productosCollection = collection(this.db, 'productos');
    const productoData = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      costo: producto.costo
    };
    addDoc(productosCollection, productoData);
  }

  // 📌 METODO PARA MODIFICAR UN DOCUMENTO
  modificarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'productos', producto.id);
    updateDoc(documentRef, {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      costo: producto.costo
    });
  }

  // 📌 METODO PARA BORRAR UN DOCUMENTO
  eliminarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'productos', producto.id);
    deleteDoc(documentRef);
  }
}
