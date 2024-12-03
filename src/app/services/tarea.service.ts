import { Injectable } from '@angular/core';
import { map, Observable, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Tarea {
  id: string;
  nombre: string;
  categoria: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl = 'http://localhost:3000/tareas';  // URL de JSON Server

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Obtener la última ID usada
  obtenerUltimaId(): Observable<string> {
    return this.http.get<Tarea[]>(this.apiUrl).pipe(
      map(tareas => {
        const maxId = tareas.length > 0 ? Math.max(...tareas.map(t => parseInt(t.id))) : 0;
        return (maxId + 1).toString();  // Aseguramos que la ID sea un string
      })
    );
  }

  // Agregar una nueva tarea
  agregarTarea(tarea: Tarea): Observable<Tarea> {
    return this.obtenerUltimaId().pipe(
      map((ultimaId) => {
        tarea.id = ultimaId; // Asignamos la nueva ID como string
        return tarea;
      }),
      switchMap((tareaConId) => this.http.post<Tarea>(this.apiUrl, tareaConId))
    );
  }

  // Eliminar una tarea por su id
  eliminarTarea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Marcar una tarea como completada o no completada
  completarTarea(id: string, completada: boolean): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.apiUrl}/${id}`, { completada });
  }

  // Modificar una tarea existente
  modificarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }
}
