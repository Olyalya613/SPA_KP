import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({standalone:true,selector:'app-register',imports:[CommonModule,ReactiveFormsModule],template:`<h2 style='margin-top:0'>Реєстрація</h2><form [formGroup]="form" (ngSubmit)="submit()" style="display:grid;gap:12px;max-width:420px"><input class="input" placeholder="Логін" formControlName="username"><input class="input" type="password" placeholder="Пароль" formControlName="password"><button class="btn" type="submit">Зареєструватися</button></form>`})
export class RegisterComponent{form=this.fb.group({username:['',Validators.required],password:['',Validators.required]});constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){}submit(){if(this.form.invalid)return;const {username,password}=this.form.getRawValue();this.auth.register(username!,password!).subscribe(()=>this.router.navigate(['/login']))}}
