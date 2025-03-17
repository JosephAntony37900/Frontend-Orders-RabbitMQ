import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iProducts } from "../models/products";
import { ProductGateway } from "../gateways/productsGateway";

@Injectable({
    providedIn: 'root'
})

export class getAllProductUseCase {
    constructor(private productGateway: ProductGateway) {}

    getAll(): Observable<iProducts[]>{
        return this.productGateway.getAll()
    }
}