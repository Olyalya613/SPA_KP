import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({selector:'app-main-content',standalone:true,imports:[RouterOutlet],template:`<main class="card"><router-outlet></router-outlet></main>`})
export class MainContentComponent{}
