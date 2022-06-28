import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanLoad {

  constructor( private authService:AuthService,
               private router: Router ) {}

  //Evita ingresar al modulo aun que este ya ha sido cargado pero el usuario no esta autenticado
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.verificaAutenticacion().pipe(
      tap( estaAutenticado => {
        if ( !estaAutenticado ) {
            this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  //Evita cargar el modulo, pero si el modulo ya ha sido cargado este lo dejara pasar sin importar si esta logueado o no
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.authService.verificaAutenticacion().pipe(
        tap( estaAutenticado => {
          if ( !estaAutenticado ) {
              this.router.navigate(['./auth/login']);
          }
        })
      );
  }
}
