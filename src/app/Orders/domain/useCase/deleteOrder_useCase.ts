import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iOrder } from "../models/order";
import { OrderGateway } from "../gateways/orderGateway";

@Injectable({
    providedIn: 'root'
})

export class deleteOrderUseCase {
    constructor(private orderGateway: OrderGateway) {}

    delete(id: number): Observable<void>{
        return this.orderGateway.delete(id)
    }
}