import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iProducts } from "../models/products";
import { ProductGateway } from "../gateways/productsGateway";

@Injectable({
    providedIn: 'root'
})

export class deleteProductUseCase {
    constructor(private productGateway: ProductGateway){}

    getById(id:number): Observable<iProducts>{
        return this.productGateway.getById(id)
    }
}