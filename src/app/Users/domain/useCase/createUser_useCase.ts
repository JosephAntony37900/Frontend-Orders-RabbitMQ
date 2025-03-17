import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUsers } from "../models/user";
import { UserGateway } from "../gateways/UsersGateways";

@Injectable({
    providedIn: 'root'
})

export class createUserUseCase {
    constructor(private userGateway: UserGateway){}

    create(iusers: iUsers): Observable<iUsers> {
        return this.userGateway.create(iusers)
    }
    
}