import { Component } from '@angular/core';
import { Ejercicio } from '../../models/ejercicio.model';
import { EjercicioService } from '../../services/ejercicio.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ejercicio',
  imports: [FormsModule, CommonModule],
  templateUrl: './ejercicio.component.html',
  styleUrl: './ejercicio.component.css'
})
export class EjercicioComponent {
  // 📌 PROPIEDADES
  ejercicios: Ejercicio[] = [];
  ejercicio = new Ejercicio();
  ejercicioSeleccionado: Ejercicio | null = null;

  constructor(private ejercicioService: EjercicioService) {
    this.getEjercicios();
  }

  async getEjercicios(): Promise<void> {
    this.ejercicios = await firstValueFrom(this.ejercicioService.getEjercicios());
  }

  // 📌 METODO PARA INSERTAR ejercicio
  insertarEjercicio() {
    this.ejercicioService.agregarEjercicio(this.ejercicio);
    this.getEjercicios();
    this.limpiarFormulario();
  }

  // 📌 METODO PARA SELECCIONAR UN ejercicio
  selectEjercicio(ejercicioSeleccionado: Ejercicio) {
    this.ejercicio = { ...ejercicioSeleccionado }; // Clonamos el objeto para evitar modificaciones en tiempo real
    this.ejercicioSeleccionado = ejercicioSeleccionado;
  }

  // 📌 METODO PARA MODIFICAR ejercicio
  updateEjercicio() {
    if (this.ejercicioSeleccionado) {
      this.ejercicioService.modificarEjercicio(this.ejercicio);
      this.getEjercicios();
      this.limpiarFormulario();
    }
  }

  // 📌 METODO PARA ELIMINAR ejercicio
  deleteEjercicio() {
    if (this.ejercicioSeleccionado) {
      this.ejercicioService.eliminarEjercicio(this.ejercicioSeleccionado);
      this.getEjercicios();
      this.limpiarFormulario();
    }
  }

  // 📌 METODO PARA LIMPIAR FORMULARIO Y VOLVER A "MODO NUEVO"
  limpiarFormulario() {
    this.ejercicio = new Ejercicio();
    this.ejercicioSeleccionado = null;
  }

  // 📌 VALIDAR FORMULARIO
  validarFormulario(): boolean {
    return (
      this.ejercicio.nombre?.trim() !== '' &&
      this.ejercicio.descripcion?.trim() !== '' &&
      this.ejercicio.costo !== null &&
      this.ejercicio.costo !== undefined &&
      this.ejercicio.costo.toString().trim() !== ''
    );
  }
}
