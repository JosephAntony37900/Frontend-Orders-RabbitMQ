import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iOrder } from "../models/order";
import { OrderGateway } from "../gateways/orderGateway";

@Injectable({
    providedIn: 'root'
})

export class GetByIdOrder {
    constructor(private orderGateway: OrderGateway) {}
    
    getByIdOrder(id: number): Observable<iOrder>{
        return this.orderGateway.getByIdOrder(id)
    }
}