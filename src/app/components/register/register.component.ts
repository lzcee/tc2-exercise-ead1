import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private api: ApiService) {}

  registerForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  registerFormMessage: string;
  product = { title: '', price: 0.0, description: '' };

  onSubmit() {
    if (!this.registerForm.invalid) {
      this.product.title = this.registerForm.value.title;
      this.product.description = this.registerForm.value.description;
      this.product.price = Number(this.registerForm.value.price);

      this.api.registerProduct(this.product).subscribe((response) => {
        if (response.ok === true) {
          this.registerForm.reset();
          this.registerFormMessage = 'Produto cadastrado com sucesso!';
          setTimeout(() => {
            this.registerFormMessage = '';
          }, 1500);
        } else {
          this.registerFormMessage = 'O cadastro não foi realizado.';
        }
      });
    } else {
      this.registerFormMessage = 'Campos preenchidos incorretamente!';
    }
  }
}
