import { Component } from '@angular/core';
import { Libro } from '../../models/libro.model';
import { LibroService } from '../../services/libro.service';
import { firstValueFrom } from 'rxjs';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro',
  imports: [FormsModule, CommonModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
//PROPIEDADES

libros: any;
libro = new Libro();

constructor(private libroService:LibroService){
  this.getLibros();
}

async getLibros():Promise<void>{
  this.libros = await firstValueFrom(this.libroService.getLibros());
}
//METODO PARA INSERTAR LIBRO
insertarLibro(){
  this.libroService.agregarLibro(this.libro);
  this.getLibros();
  this.libro = new Libro();
}
 //METODO PARA SELECCIONAR UN LIBRO
selectLibro(libroSeleccionado:Libro){
this.libro = libroSeleccionado;
}

//METODO MODIFICAR LIBRO
updateLibro(){
  this.libroService.modificarLibro(this.libro);
  this.getLibros();
  this.libro = new Libro();
}

deleteLibro(){
  this.libroService.eliminarLibro(this.libro);
  this.getLibros();
  this.libro = new this.libros();
}

validarFormulario(): boolean {
  return (
      this.libro.titulo?.trim() !== '' &&
      this.libro.autor?.trim() !== '' &&
      this.libro.editorial?.trim() !== '' &&
      this.libro.anioPublicacion !== null &&
      this.libro.anioPublicacion !== undefined &&
      this.libro.anioPublicacion.toString().trim() !== ''
  );
}
}
