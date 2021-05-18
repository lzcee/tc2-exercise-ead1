import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../models/Product';
import { ApiService } from './../../services/api.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  constructor(private api: ApiService) {}

  @Input() selectedProduct: Product;
  @Output() closeModal = new EventEmitter<string>();

  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  updateFormMessage: string;
  product = { title: '', price: 0.0, description: '', _id: '' };

  closeUpdateConfirmationModal(): void {
    this.closeModal.emit(null);
  }

  onSubmit() {
    if (!this.updateForm.invalid) {
      this.product.title = this.updateForm.value.title;
      this.product.description = this.updateForm.value.description;
      this.product.price = Number(this.updateForm.value.price);
      this.product._id = this.selectedProduct._id;

      this.api.updateProduct(this.product).subscribe((response) => {
        if (response.ok === true) {
          this.updateForm.reset();
          this.updateFormMessage = 'Produto atualizado com sucesso!';
          setTimeout(() => {
            this.updateFormMessage = '';
            this.closeUpdateConfirmationModal();
          }, 1500);
        } else {
          this.updateFormMessage = 'A atualização não foi realizada.';
        }
      });
    } else {
      this.updateFormMessage = 'Campos preenchidos incorretamente!';
    }
  }

  ngOnInit() {
    this.updateForm.setValue({
      title: this.selectedProduct.title,
      price: this.selectedProduct.price,
      description: this.selectedProduct.description,
    });
  }
}
