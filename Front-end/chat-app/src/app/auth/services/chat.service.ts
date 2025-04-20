import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private socket: any;
  private readonly serverUrl = 'http://localhost:3000';


  private activeUser = new BehaviorSubject<string>('');
  private userList = new BehaviorSubject<string[]>([]);
  private messageList = new BehaviorSubject<any[]>([]);

  constructor(private socket: Socket,
    
  ) {}

  // Register user (after login)
  register(username: string) {
    this.socket.emit('register', username);
  }

  // Listen for updated user list
  listenUserList() {
    return this.userList.asObservable();
  }

  // Listen for private messages
  listenPrivateMessage() {
    return this.socket.fromEvent('private-message');
  }

  // Listen for errors (user not online)
  listenError() {
    return this.socket.fromEvent('error');
  }

  // Update active user (whom you are chatting with)
  setActiveUser(user: string) {
    this.activeUser.next(user);
    this.messageList.next([]); // Clear messages when a new user is selected
  }

  // Send private message to another user
  sendPrivateMessage(to: string, message: string, from: string) {
    this.socket.emit('private-message', { to, message, from });
  }

  // Update user list
  updateUserList(users: string[]) {
    this.userList.next(users);
  }

  // Update messages
  updateMessages(message: any) {
    this.messageList.next([...this.messageList.value, message]);
  }

  // Get the current message list
  getMessages() {
    return this.messageList.asObservable();
  }

  // Get the active user (person being chatted with)
  getActiveUser() {
    return this.activeUser.asObservable();
  }
}