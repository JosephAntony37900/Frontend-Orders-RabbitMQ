import { Observable } from "rxjs";
import { iNotification } from "../models/notification";

export abstract class NotificationGateway {
    abstract getByIdUser(id: number): Observable<iNotification>
}