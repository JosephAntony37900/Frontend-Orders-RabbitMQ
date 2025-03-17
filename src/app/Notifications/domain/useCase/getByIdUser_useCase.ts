import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { iNotification } from "../models/notification";
import { NotificationGateway } from "../gateways/notificationGateway";

@Injectable({
    providedIn: 'root'
})

export class GetNotificationByIdUserUseCase {
    constructor(private notificationGateway: NotificationGateway) {}

    getByIdUser(id: number): Observable<iNotification>{
        return this.notificationGateway.getByIdUser(id)
    }
}