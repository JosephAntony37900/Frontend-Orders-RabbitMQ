import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUsers } from "../models/user";
import { UserGateway } from "../gateways/UsersGateways";

@Injectable({
    providedIn: 'root'
})

export class deleteUserUseCase {
    constructor( private userGateway: UserGateway){}

    delete(id: number): Observable<void>{
        return this.userGateway.delete(id);
    }

}