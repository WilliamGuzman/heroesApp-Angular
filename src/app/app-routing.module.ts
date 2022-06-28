import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) //LazyLoad hasta que no se ingrese al path:auth no se cargara en memoria el modulo correspondiente
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ), //LazyLoad hasta que no se ingrese al path:heroes no se cargara en memoria el modulo correspondiente
    canLoad: [ AuthGuard ], //Esto protejera las rutas par si un usuario quiere ingresar a estos modulos sin estar logueado. ( Revisar el archivo auth.guard para ver las validaciones )
    canActivate: [ AuthGuard ] //Evita ingresar al usuario si este no esta autenticado aun que ya este cargado el componente que accedio anteriormente
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]



@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
  
})
export class AppRoutingModule { }
