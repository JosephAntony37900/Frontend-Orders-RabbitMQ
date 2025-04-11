import { Observable } from "rxjs";
import { iOrder } from "../models/order";

export abstract class OrderGateway {
    abstract create(iorder: iOrder): Observable<iOrder>;
    abstract getAllByUser(id: number): Observable<iOrder[]>;
    abstract update(id: number, ioder: iOrder): Observable<iOrder>;
    abstract delete(id: number): Observable<void>;
    abstract getByIdOrder(id: number): Observable<iOrder>;
}