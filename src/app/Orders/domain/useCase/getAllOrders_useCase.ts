import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iOrder } from "../models/order";
import { OrderGateway } from "../gateways/orderGateway";

@Injectable({
    providedIn: 'root'
})

export class getAllOrdersUseCase {
    constructor(private orderGateway: OrderGateway) {}

    getAllByUser(id: number): Observable<iOrder[]>{
        return this.orderGateway.getAllByUser(id)
    }
}