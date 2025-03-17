import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUsers} from "../models/user";
import { UserGateway } from "../gateways/UsersGateways";

@Injectable({
    providedIn: 'root'
})

export class updateUserUseCase {
    constructor( private userGateway: UserGateway){}

    update(id: number, iuser: iUsers): Observable<iUsers> {
        return this.userGateway.update(id, iuser)
    }
}