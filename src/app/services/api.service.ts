import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://banco-dados-teste.glitch.me/api';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/produtos`);
  }

  registerProduct(product): Observable<any> {
    let body = new HttpParams();
    body = body.set('title', product.title);
    body = body.set('price', product.price);
    body = body.set('description', product.description);
    return this.http.post(`${this.baseUrl}/produtos`, body, {
      observe: 'response',
    });
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/produtos/${productId}`, {
      observe: 'response',
    });
  }

  updateProduct(product): Observable<any> {
    let body = new HttpParams();
    body = body.set('title', product.title);
    body = body.set('price', product.price.toString());
    body = body.set('description', product.description);
    return this.http.put(`${this.baseUrl}/produtos/${product._id}`, body, {
      observe: 'response',
    });
  }
}
