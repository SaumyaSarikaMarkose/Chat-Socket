import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private toastr: ToastrService, private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['admin'], // default to admin
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      this.auth.register(this.registerForm.value).subscribe((res: any) => {
        console.log("ressssss",res)
        this.auth.saveToken(res.token);
        localStorage.setItem('chatUser', res.name);
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/login']);
      });
    }
  }
}
