import { Component } from '@angular/core';

interface Persona{
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Mauricio',
    favoritos: [
      { id: 1, nombre: 'Metal Gear'},
      { id: 2, nombre: 'DeadthStranding'},
    ]
  }

  constructor() { }

  guardar() {
    console.log('Formulario posteado');
    
  }

  //Eliminar elemento por id
  borrarFavorito(id: number) {
    var index = this.persona
      .favoritos
      .findIndex(f => f.id === id);
    
    if (index >= 0)
      this.persona.favoritos.splice(index, 1);
  }

  agregarJuego() {
    if (this.nuevoJuego?.length > 0) {
      let ultimo = this.persona.favoritos.pop();
      let id = 0;

      if (ultimo !== undefined) {
        this.persona.favoritos.push(ultimo);
        id = ultimo.id + 1;
      }
      else {
        id = 0;
      }

      const nuevoFavorito: Favorito = {
        id: (id),
        nombre: this.nuevoJuego
      };

      this.persona.favoritos
        .push({ ...nuevoFavorito });
      
      this.nuevoJuego = '';
    }
  }

}
