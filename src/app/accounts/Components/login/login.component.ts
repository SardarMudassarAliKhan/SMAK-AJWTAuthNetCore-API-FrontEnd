import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../../../core/Models/AuthenticatedResponse';
import { UserRole } from '../../../core/Enums/UserRole';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor
  (
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    debugger;
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      debugger;
      this.accountService.login(credentials).subscribe(
        (response: AuthenticatedResponse) => {
          debugger;
          const token = response.token;
          const refreshToken = response.refreshToken;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          if (response.role[0] === UserRole.Admin) {
            this.router.navigate(['/dashboard', 'Admin']);
          } else
          if (response.role[0] === UserRole.Moderator) {
            this.router.navigate(['/dashboard', 'Moderator']);
          }
           else {
            this.router.navigate(['/dashboard', 'User']);
          }
          console.log(response);
        },
        error => {
          // Handle error here
          console.error(error);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
  //implementing logout
  Logout() {
    debugger;
    this.accountService.logout();
    this.router.navigate(['/accounts', 'login']);
  }

  //Navigating to account/register route
  Regsiter() {
    debugger;
     this.router.navigate(['/accounts', 'register'])
    }
}
