import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Auth
  register(payload: any): Observable<any> { return this.http.post(`${this.base}/users/register`, payload); }
  login(payload: any): Observable<any> { return this.http.post(`${this.base}/users/login`, payload); }

  // Products
  getProducts(params?: any): Observable<any> { return this.http.get(`${this.base}/products`, { params }); }
  getProduct(id: string | number): Observable<any> { return this.http.get(`${this.base}/products/${id}`); }

  // Orders
  createOrder(payload: any): Observable<any> { return this.http.post(`${this.base}/orders`, payload); }
}
