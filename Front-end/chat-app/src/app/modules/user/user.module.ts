import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = { 
  url: 'http://localhost:3000', 
  options: {} 
};


@NgModule({
  declarations: [
      HomeComponent,
      ChatComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    // BrowserAnimationsModule, 
    ToastrModule.forRoot({ 
      positionClass: 'toast-top-center',
      timeOut: 5000,
      closeButton: true,
      progressBar: true
      }),
  ]
})
export class UserModule { }
