import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { iOrder } from "../../domain/models/order";
import { OrderGateway } from "../../domain/gateways/orderGateway";

@Injectable({
    providedIn: 'root'
})

export class OrderService implements OrderGateway {
    private apiURL = 'http://localhost:8080/orders'
    constructor( private httpClient: HttpClient) {}

    getAllByUser(id: number): Observable<iOrder[]>{
        return this.httpClient.get<iOrder[]>(`${this.apiURL}/${id}`)
    }

    create(iorder:iOrder): Observable<iOrder>{
        return this.httpClient.post<iOrder>(`${this.apiURL}`, iorder)
    }

    update(id:number, iorder:iOrder): Observable<iOrder>{
        return this.httpClient.put<iOrder>(`${this.apiURL}/${id}`, iorder)
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiURL}/${id}`)
    }

    getByIdOrder(id: number): Observable<iOrder> {
        return this.httpClient.get<iOrder>(`${this.apiURL}/one/${id}`)
    }
}

