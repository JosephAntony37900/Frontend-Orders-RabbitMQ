import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iOrder } from "../models/order";
import { OrderGateway } from "../gateways/orderGateway";

@Injectable({
    providedIn: 'root'
})

export class createOrderUseCase {
    constructor(private orderGateway: OrderGateway) {}

    create(iorder: iOrder): Observable<iOrder>{
        return this.orderGateway.create(iorder)
    }
}