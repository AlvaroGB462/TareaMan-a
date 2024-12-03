import { Component, OnInit } from '@angular/core';
import { Tarea, TareaService } from '../../services/tarea.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
  imports: [FormsModule]
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea: string = '';
  categoria: string = 'Personal';
  tareaEditada: Tarea | null = null;

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.mostrarTareas(); // Cargar tareas al inicio
  }

  // Mostrar todas las tareas
  mostrarTareas(): void {
    this.tareaService.obtenerTareas().subscribe((data) => {
      this.tareas = data;
    });
  }

  // Agregar una nueva tarea
  agregarTarea(): void {
    if (this.nuevaTarea) {
      const nuevaTarea: Tarea = {
        id: "", // El id se asignará automáticamente en el servicio
        nombre: this.nuevaTarea,
        categoria: this.categoria,
        completada: false
      };

      this.tareaService.agregarTarea(nuevaTarea).subscribe((tareaAgregada) => {
        // Una vez que la tarea se ha agregado, actualizamos la lista de tareas
        this.mostrarTareas();
        this.nuevaTarea = ''; // Limpiar el campo de entrada
      });
    }
  }

  // Marcar una tarea como completada o no completada
  completarTarea(id: string, completada: boolean): void {
    this.tareaService.completarTarea(id, !completada).subscribe(() => {
      this.mostrarTareas(); // Actualizar la lista después de cambiar el estado de completada
    });
  }

  // Eliminar una tarea
  eliminarTarea(id: string): void {
    this.tareaService.eliminarTarea(id).subscribe(() => {
      this.mostrarTareas(); // Actualizar la lista después de eliminar una tarea
    });
  }

  // Editar una tarea (modificar)
  editarTarea(tarea: Tarea): void {
    this.tareaEditada = { ...tarea }; // Guardamos una copia de la tarea para editarla
  }

  // Guardar las modificaciones de una tarea
  guardarModificaciones(): void {
    if (this.tareaEditada) {
      this.tareaService.modificarTarea(this.tareaEditada).subscribe(() => {
        this.mostrarTareas(); // Actualizar la lista de tareas después de la modificación
        this.tareaEditada = null; // Limpiar el formulario de edición
      });
    }
  }
}
