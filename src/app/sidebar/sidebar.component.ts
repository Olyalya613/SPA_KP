import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({selector:'app-sidebar',standalone:true,imports:[RouterModule],template:`<aside class="card"><h3>Навігація</h3><ul><li><a routerLink="/">Список телефонів</a></li><li><a routerLink="/phones/new">Додати телефон</a></li><li><a routerLink="/profile">Профіль</a></li></ul></aside>`})
export class SidebarComponent{}
