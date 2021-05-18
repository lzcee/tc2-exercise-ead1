import { Product } from './../../models/Product';
import { ApiService } from './../../services/api.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(private api: ApiService) {}

  @Input() selectedProduct: Product;
  @Output() closeDeleteModal = new EventEmitter<string>();

  deleteMessage: string;

  closeDeleteConfirmationModal(): void {
    this.closeDeleteModal.emit(null);
  }

  delete(productId: string) {
    this.api.deleteProduct(productId).subscribe((response) => {
      if (response.ok === true) {
        this.deleteMessage = 'Produto excluído com sucesso!';
        setTimeout(() => {
          this.deleteMessage = '';
          this.closeDeleteConfirmationModal();
        }, 1500);
      } else {
        this.deleteMessage = 'O produto não foi deletado.';
      }
    });
  }

  ngOnInit(): void {}
}
