import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AutofocusDirective } from '../directives/autofocus.directive';
@Component({standalone:true,selector:'app-login',imports:[CommonModule,ReactiveFormsModule,AutofocusDirective],template:`<h2 style='margin-top:0'>Вхід</h2><form [formGroup]="form" (ngSubmit)="submit()" style="display:grid;gap:12px;max-width:420px"><input class="input" appAutofocus placeholder="Логін" formControlName="username"><input class="input" type="password" placeholder="Пароль" formControlName="password"><button class="btn" type="submit">Увійти</button></form>`})
export class LoginComponent{form=this.fb.group({username:['',Validators.required],password:['',Validators.required]});constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){}submit(){if(this.form.invalid)return;const {username,password}=this.form.getRawValue();this.auth.login(username!,password!).subscribe(()=>this.router.navigate(['/']))}}
