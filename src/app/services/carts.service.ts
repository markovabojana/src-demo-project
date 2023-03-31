import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Users } from '../models/users';
import { Cart, Carts } from '../models/carts';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  apiUrl = environment.apiUrl + '/carts';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Carts> {
    return this.http.get<Carts>(this.apiUrl, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getCart(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${cartId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getCartsOfUser(userId: number): Observable<Carts> {
    return this.http.get<Carts>(`${this.apiUrl}/user/${userId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(
      `${this.apiUrl}/add`,
      {
        cart,
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  updateCart(cartId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(
      `${this.apiUrl}/${cartId}`,
      { cart },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  deleteCart(cartId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${cartId}`);
  }
}
