import { iUsers } from "../models/user";
import { Observable } from "rxjs";
import { AuthResponse } from "../models/auth_response";

export abstract class UserGateway {
    abstract getAll(): Observable<iUsers[]>;
    abstract delete(id: number): Observable<void>;
    abstract create(iusers: iUsers): Observable<iUsers>;
    abstract update(id: number, iuser: iUsers): Observable<iUsers>;
    abstract login(Email: string, Contraseña: string): Observable<AuthResponse>;
}