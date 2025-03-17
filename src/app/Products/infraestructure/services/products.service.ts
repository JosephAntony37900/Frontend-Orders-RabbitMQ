import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { iProducts } from "../../domain/models/products";
import { ProductGateway } from "../../domain/gateways/productsGateway";

@Injectable({
    providedIn: 'root'
})

export class ProductService implements ProductGateway {
    private apiURL = 'http'
    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<iProducts[]>{
        return this.httpClient.get<iProducts[]>(this.apiURL)
    }

    create(iproducts: iProducts): Observable<iProducts>{
        return this.httpClient.post<iProducts>(`${this.apiURL}`, iproducts)
    }

    update(id:number, iproducts:iProducts): Observable<iProducts>{
        return this.httpClient.put<iProducts>(`${this.apiURL}/${id}`, iproducts);
    }

    delete(id:number): Observable<void>{
        return this.httpClient.delete<void>(`${this.apiURL}/${id}`)
    }
}