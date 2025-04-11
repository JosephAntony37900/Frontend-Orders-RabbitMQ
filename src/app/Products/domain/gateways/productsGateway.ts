import { Observable } from "rxjs";
import { iProducts } from "../models/products";

export abstract class ProductGateway {
    abstract create(iproduct: iProducts): Observable<iProducts>;
    abstract getAll(): Observable<iProducts[]>;
    abstract update(id: number, iproduct: iProducts): Observable<iProducts>;
    abstract delete(id: number): Observable<void>;
    abstract getById(id: number): Observable<iProducts>;
}