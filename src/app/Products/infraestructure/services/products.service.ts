import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { iProducts } from "../../domain/models/products";
import { ProductGateway } from "../../domain/gateways/productsGateway";

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ProductGateway {
  private apiURL = 'http://localhost:8080/products';
  
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<iProducts[]> {
    return this.httpClient.get<iProducts[]>(this.apiURL);
  }

  create(product: iProducts): Observable<iProducts> {
    return this.httpClient.post<iProducts>(this.apiURL, product);
  }

  update(id: number, product: iProducts): Observable<iProducts> {
    return this.httpClient.put<iProducts>(`${this.apiURL}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
  }

  getById(id: number): Observable<iProducts> {
      return this.httpClient.get<iProducts>(`${this.apiURL}/${id}`);
  }
}