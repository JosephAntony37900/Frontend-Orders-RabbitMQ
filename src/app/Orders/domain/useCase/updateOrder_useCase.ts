import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iOrder } from "../models/order";
import { OrderGateway } from "../gateways/orderGateway";

@Injectable({
    providedIn: 'root'
})

export class updateOrderUseCase {
    constructor(private orderGateway: OrderGateway) {}

    update(id: number, iorder: iOrder): Observable<iOrder>{
        return this.orderGateway.update(id, iorder)
    }
}





