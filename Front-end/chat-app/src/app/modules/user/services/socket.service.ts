import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  io  from 'socket.io-client';
import type { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3000');

  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, (data :any) => observer.next(data));
      return () => this.socket.off(event);
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
