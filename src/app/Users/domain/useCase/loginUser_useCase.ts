import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserGateway } from "../gateways/UsersGateways";

@Injectable({
    providedIn: 'root'
})
export class LoginUserUseCase {
    constructor(private userGateway: UserGateway) {}

    login(Email: string, Contraseña: string): Observable<{ token: string }> {
        return this.userGateway.login(Email, Contraseña);
    }
}
