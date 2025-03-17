import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { iNotification } from "../../domain/models/notification";
import { NotificationGateway } from "../../domain/gateways/notificationGateway";


@Injectable({
    providedIn: 'root'
})

export class NotificationService implements NotificationGateway {
    private apiURL = 'http'
    constructor (private httpClient: HttpClient) {}

    getByIdUser(id: number): Observable<iNotification> {
        return this.httpClient.get<iNotification>(`${this.apiURL}/${id}`)
    }

}