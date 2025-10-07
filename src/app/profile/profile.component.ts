import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({standalone:true,selector:'app-profile',imports:[CommonModule],template:`<h2 style='margin-top:0'>Профіль</h2><p *ngIf="auth.isAuthenticated(); else guest">Ви увійшли. Токен: <code>{{auth.token}}</code></p><ng-template #guest><p class='muted'>Ви не авторизовані.</p></ng-template><button class='btn' (click)="auth.logout()">Вийти</button>`})
export class ProfileComponent{constructor(public auth:AuthService){}}
