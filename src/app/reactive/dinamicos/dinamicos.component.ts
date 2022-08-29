import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator, FormArray, FormControl } from '@angular/forms';

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
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ], Validators.required)
  });
  
  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
}

  constructor(private fb: FormBuilder) { }

  validacionCampo(campo: string) {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched;
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return;

    //Se puede usar new FormControl en lugar del servicio FormBuilder
    //es la misma lógica
    // this.favoritosArr.push(
    //   this.fb.control(
    //     this.nuevoFavorito.value,
    //     Validators.required
    //   )
    // );

    this.favoritosArr.push(
      new FormControl(
        this.nuevoFavorito.value,
        Validators.required
      )
    );
    this.nuevoFavorito.reset();
  }

  eliminarFavorito(index: number) {
    this.favoritosArr.removeAt(index);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    while (this.favoritosArr.length > 0)
      this.favoritosArr.removeAt(0);
    this.miFormulario.reset();
    
  }
}
