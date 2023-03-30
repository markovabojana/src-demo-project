import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Users } from '../models/users';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.apiUrl, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  searchUsers(searchQuery: string): Observable<Users> {
    searchQuery = searchQuery.trim();
    let params = searchQuery ? new HttpParams().set('q', searchQuery) : {};
    return this.http.get<Users>(`${this.apiUrl}/search`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: params,
    });
  }

  filterUsers(
    limit: number,
    skip: number,
    select: Array<string>
  ): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: new HttpParams()
        .set('limit', limit)
        .set('skip', skip)
        .set('select', select.toString()),
    });
  }

  limitAndSkipUsers(filters: Map<string, string>): Observable<Users> {
    let firstEntry = filters.keys().next().value;
    return this.http.get<Users>(`${this.apiUrl}/filter`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: new HttpParams()
        .set('key', firstEntry[0])
        .set('value', firstEntry[1]),
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/add`,
      {
        user,
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  updateUser(userId: number): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${userId}`,
      {},
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
}
