import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iProducts } from "../models/products";
import { ProductGateway } from "../gateways/productsGateway";

@Injectable({
    providedIn: 'root'
})

export class createProductUseCase {
    constructor(private productGateway: ProductGateway) {}

    create(iproduct: iProducts): Observable<iProducts> {
        return this.productGateway.create(iproduct)
    }
}