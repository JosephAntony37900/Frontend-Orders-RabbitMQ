import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iProducts } from "../models/products";
import { ProductGateway } from "../gateways/productsGateway";

@Injectable({
    providedIn: 'root'
})

export class updateProductUseCase {
    constructor(private productGateway: ProductGateway) {}

    update(id: number, iproduct: iProducts): Observable<iProducts>{
        return this.productGateway.update(id, iproduct)
    }
}