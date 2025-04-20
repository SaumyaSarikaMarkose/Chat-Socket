import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { authGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [ 
  { path: 'chat',canActivate: [authGuard], component: ChatComponent },     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
