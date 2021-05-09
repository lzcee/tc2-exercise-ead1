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

  getProducts(): void {
    this.api.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  edit(productId: string) {
    console.log(productId);
  }

  delete(productId: string) {
    this.api.deleteProduct(productId).subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
