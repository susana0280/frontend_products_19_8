


import { afterNextRender, afterRender, AfterRenderRef, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule,} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

      existToken:boolean=false
      
menuOption:string=""
_auth=inject(AuthService)
_router=inject(Router)

 

    
onOption(menuOption:string){
  this.menuOption=menuOption
 
}


}

