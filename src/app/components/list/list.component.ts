import { Product } from './../../models/Product';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private api: ApiService) {}

  products: Product[];
  deleteConfirmation: boolean;
  editConfirmation: boolean;
  selectedProduct: Product;

  getProducts(): void {
    this.api.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  delete(productId: string) {
    this.api.deleteProduct(productId).subscribe((response) => {
      console.log(response);
      this.getProducts();
    });
  }

  openDeleteConfirmationModal(product: Product) {
    this.deleteConfirmation = true;
    this.selectedProduct = product;
  }

  closeDeleteConfirmationModal(): void {
    this.deleteConfirmation = false;
    this.selectedProduct = null;
  }

  openEditConfirmationModal(product: Product) {
    this.editConfirmation = true;
    this.selectedProduct = product;
  }

  closeEditConfirmationModal(): void {
    this.editConfirmation = false;
    this.selectedProduct = null;
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
