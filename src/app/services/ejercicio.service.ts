import { inject, Injectable } from '@angular/core';
import { Ejercicio } from '../models/ejercicio.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private db: Firestore = inject(Firestore);

  constructor() { }

  // 📌 Método para obtener todos los ejercicios, asegurando el tipo Ejercicio
  getEjercicios() {
    const ejerciciosCollection = collection(this.db, 'ejercicios');
    return collectionData(ejerciciosCollection, { idField: 'id' }).pipe(
      map((data) => data.map(item => item as Ejercicio)), // 📌 Convertir los datos al modelo Ejercicio
      first()
    );
  }

  // 📌 Agregar un nuevo ejercicio
  agregarEjercicio(ejercicio: Ejercicio) {
    const ejerciciosCollection = collection(this.db, 'ejercicios');
    const ejercicioData = {
      nombre: ejercicio.nombre,
      descripcion: ejercicio.descripcion,
      costo: ejercicio.costo
    };
    addDoc(ejerciciosCollection, ejercicioData);
  }

  // 📌 Modificar un ejercicio
  modificarEjercicio(ejercicio: Ejercicio) {
    const documentRef = doc(this.db, 'ejercicios', ejercicio.id);
    updateDoc(documentRef, {
      nombre: ejercicio.nombre,
      descripcion: ejercicio.descripcion,
      costo: ejercicio.costo
    });
  }

  // 📌 Eliminar un ejercicio
  eliminarEjercicio(ejercicio: Ejercicio) {
    const documentRef = doc(this.db, 'ejercicios', ejercicio.id);
    deleteDoc(documentRef);
  }
}
