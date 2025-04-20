import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
 
  
  currentUser = '';
  users :any;
  list =  ['ammu','appu','david'];
  selectedChatUser = 'group';
  selectedFile: File | null = null;

  message = '';
  // messages: { from: string, text: string, type: 'group' | 'private' }[] = [];
  messages: {
    from: string;
    text?: string;
    type: 'group' | 'private';
    file?: string;
    fileType?: string;
    fileName?: string;
  }[] = [];
  


  private groupSub!: Subscription;
  private privateSub!: Subscription;

  constructor(private socketService: SocketService,
     private router: Router, private auth: AuthService,
     private toastr: ToastrService) {}

  ngOnInit() {
    const user = localStorage.getItem('chatUser');
    this.auth.getAll().subscribe((res: any) => {
      console.log("resssssspooooo",res)
     this.users = res.map((user:any) => user.name);
     console.log(this.users,"/////////////////")
    });
    if (!user) {
      this.router.navigate(['/chat']);
      return;
    }


    this.socketService.on('group-file').subscribe((data: any) => {
      this.messages.push({ ...data, type: 'group' });
    });
    
    this.socketService.on('private-file').subscribe((data: any) => {
      if (
        data.from === this.selectedChatUser ||
        data.from === this.currentUser
      ) {
        this.messages.push({ ...data, type: 'private' });
      }
    });

    
    
    this.currentUser = user;
    this.socketService.emit('join', this.currentUser);

    this.groupSub = this.socketService.on('group-message').subscribe(data => {
      this.messages.push({ ...data, type: 'group' });
      
    });

    this.privateSub = this.socketService.on('private-message').subscribe(data => {
      this.messages.push({ ...data, type: 'private' });
      
    });
  }
  onFileSelected(event: any) {
    console.log("eeeeeeeeeeeeeeeee")
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          from: this.currentUser,
          file: reader.result,
          fileName: file.name,
          fileType: file.type,
          to: this.selectedChatUser === 'group' ? null : this.selectedChatUser
        };
  
        if (this.selectedChatUser === 'group') {
          this.socketService.emit('group-file', fileData);
        } else {
          this.socketService.emit('private-file', fileData);
          this.messages.push({ from: this.currentUser, text: file.name, type: 'private' });
        }
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  sendMessage() {
    if (!this.message.trim()) return;
    const data = { from: this.currentUser, text: this.message };
    

    if (this.selectedChatUser === 'group') {
      this.socketService.emit('group-message', data);
      // alert('message sent');
      this.toastr.success('Message sent', 'Success');
    } else {
      this.socketService.emit('private-message', { ...data, to: this.selectedChatUser });
      this.messages.push({ ...data, type: 'private' });
      // alert('message sent');
      this.toastr.success('Message Sent', 'Success');
    }

    this.message = '';
  }

  logout() {
    localStorage.removeItem('chatUser');
    this.router.navigate(['/']);
  }
  adminDashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
  ngOnDestroy() {
    this.groupSub?.unsubscribe();
    this.privateSub?.unsubscribe();
  }
}