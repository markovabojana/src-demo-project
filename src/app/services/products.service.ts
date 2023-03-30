import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Products } from '../models/products';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Products> {
    return this.http.get<Products>(this.apiUrl, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  searchProducts(searchQuery: string): Observable<Products> {
    searchQuery = searchQuery.trim();
    let params = searchQuery ? new HttpParams().set('q', searchQuery) : {};
    return this.http.get<Products>(`${this.apiUrl}/search`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: params,
    });
  }

  limitAndSkipProducts(
    limit: number,
    skip: number,
    select: Array<string>
  ): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: new HttpParams()
        .set('limit', limit)
        .set('skip', skip)
        .set('select', select.toString()),
    });
  }

  getAllProductsCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiUrl}/categories`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getProductsOfCategory(categoryName: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/category/${categoryName}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}/add`,
      {
        product,
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  updateProduct(productId: number): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/${productId}`,
      {},
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }
}
