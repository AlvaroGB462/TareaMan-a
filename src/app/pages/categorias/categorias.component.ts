import { Component } from '@angular/core';
import { Tarea, TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categorias: string[] = ['Personal', 'Trabajo', 'Escuela'];
  categoriaSeleccionada: string | null = null;
  tareasFiltradas: Tarea[] = [];

  constructor(private tareaService: TareaService) {}

  // Seleccionar una categoría y mostrar las tareas correspondientes
  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.tareaService.obtenerTareas().subscribe((tareas) => {
      this.tareasFiltradas = tareas.filter((t) => t.categoria === categoria);
    });
  }

  // Marcar una tarea como completada o no completada
  completarTarea(id: string, completada: boolean): void {
    // Llamamos al servicio para actualizar el estado de completada
    this.tareaService.completarTarea(id, !completada).subscribe(() => {
      this.actualizarTareas();
    });
  }

  // Eliminar una tarea
  eliminarTarea(id: string): void {
    this.tareaService.eliminarTarea(id).subscribe(() => {
      this.actualizarTareas();
    });
  }

  // Actualizar las tareas filtradas
  private actualizarTareas(): void {
    if (this.categoriaSeleccionada) {
      this.seleccionarCategoria(this.categoriaSeleccionada);
    }
  }

  // Para evitar problemas con el tracking de las listas
  trackByIndex(index: number): number {
    return index;
  }

  // Usamos trackById para optimizar el rendimiento al usar trackBy en la lista de tareas
  trackById(index: number, tarea: Tarea): string {
    return tarea.id;
  }
}
