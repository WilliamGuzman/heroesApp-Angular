import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interface/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [
    `
      .container{
        margin:10px;
      }
    `
  ]
})
export class HeroesHomeComponent implements OnInit {
  
  get auth() : Auth{
    return this.authService.auth;
  }
  

  constructor( private router:Router,
               private authService:AuthService ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['./auth']);
  }

}
