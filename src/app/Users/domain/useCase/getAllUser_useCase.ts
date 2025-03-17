import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUsers } from "../models/user";
import { UserGateway } from "../gateways/UsersGateways";

@Injectable({
    providedIn: 'root'
})

export class getAllUserUseCase {
    constructor( private userGateway: UserGateway) {}

    getAll(): Observable<iUsers[]> {
        return this.userGateway.getAll()
    }
}