import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  users = ['appu', 'ammu', 'anu'];
  selectedUser = '';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, 
    private router: Router,private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((res: any) => {
        console.log("ressssss",res)
        this.auth.saveToken(res.token);
        localStorage.setItem('chatUser', res.name);
        localStorage.setItem('userRole',res.role)
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/chat']);
      });
     
    }
  }

  send(){
    this.toastr.success('Login successful!', 'Success');
  }
}
