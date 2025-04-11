import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserGateway } from "../gateways/UsersGateways";
import { AuthResponse } from "../models/auth_response";

@Injectable({
    providedIn: 'root'
})
export class LoginUserUseCase {
    constructor(private userGateway: UserGateway) {}

    login(Email: string, Contraseña: string): Observable<AuthResponse> {
        return this.userGateway.login(Email, Contraseña);
    }
}
