import { iUsers } from "../models/user";
import { Observable } from "rxjs";

export abstract class UserGateway {
    abstract getAll(): Observable<iUsers[]>;
    abstract delete(id: number): Observable<void>;
    abstract create(iusers: iUsers): Observable<iUsers>;
    abstract update(id: number, iuser: iUsers): Observable<iUsers>;
    abstract login(Email: string, Contraseña: string): Observable<{ token: string }>;
}