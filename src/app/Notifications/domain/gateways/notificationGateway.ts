import { Observable } from "rxjs";
import { iNotification } from "../models/notification";

export abstract class NotificationGateway {
    /* abstract create(inotification: iNotification): Observable<iNotification>;
    abstract getAll(): Observable<iNotification>;
    abstract update(id:number, inotification: iNotification): Observable<iNotification>;
    abstract delete(id:number): Observable<void>; */
    abstract getByIdUser(id: number): Observable<iNotification>
}