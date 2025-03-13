import { inject, Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';
import {addDoc, collection, collectionData,deleteDoc,doc,Firestore,updateDoc} from '@angular/fire/firestore'
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

private db: Firestore = inject(Firestore);

  constructor() { }

    //METODO PARA OBTENER TODOS LOS DOCUMENTOS DE LA COLECCIÓN

    getLibros(){
      const librosCollection = collection(this.db, 'libros');
      return collectionData((librosCollection), {idField: 'id'})
      .pipe(first())
    }
  
    //METODO PARA AGREGAR UN NUEVO DOCUMENTO
    agregarLibro(libro:Libro){
      const librosCollection = collection(this.db, 'libros')
      const libroData ={
        titulo: libro.titulo,
        autor: libro.autor,
        editorial: libro.editorial,
        anioPublicacion: libro.anioPublicacion
      };
      addDoc(librosCollection, libroData);
    }
  
    //METODO PARA MODIFICAR UN DOCUMENTO
    modificarLibro(libro:Libro){
      const documentRef = doc(this.db, 'libros', libro.id);
      updateDoc(documentRef,{
        titulo: libro.titulo,
        autor: libro.autor,
        editorial:libro.editorial,
        anioPublicacion:libro.anioPublicacion
      });
    }
  
    //METODO PARA BORRAR UN DOCUMENTO
    eliminarLibro(libro:Libro){
      const documentRef = doc(this.db, 'libros', libro.id);
      deleteDoc(documentRef);
    }
}
