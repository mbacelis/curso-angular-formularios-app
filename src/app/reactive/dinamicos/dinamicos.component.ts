import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear'],
      ['Death Stranding']
    ], Validators.required)
  });

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
}

  constructor(private fb: FormBuilder) { }

  validacionCampo(campo: string) {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(favorito: string) {
    
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
    
  }
}
