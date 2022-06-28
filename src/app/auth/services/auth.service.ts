import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  
  get auth(): Auth {
    return { ...this._auth! }; //Retornamos una copia del objeto para no modificar el original ya que es de tipo privado
  }
  
  constructor( private http: HttpClient ) { }

  verificaAutenticacion():Observable<boolean>{

    //La funcion of(boolean) convierte un booleano a Observable para que al momento de recibir la respuesta donde se llame dicho valor que retorna se puedan utilizar las propiedades
    //de suscribe y esto nos permite utilizar pipe y dentro los tap para trabajar con la información o resolver una nueva petición.
    if ( !localStorage.getItem('token') ) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe( 
                map( auth => {
                  this._auth = auth;
                  return true; // Aca no se regresa con el of() ya que la respuesta es resuelta como un observable
                })
            );  
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe( 
                tap( auth => this._auth = auth),
                tap( auth => localStorage.setItem('token', auth.id ) )
            );
  }

  logout(){
    this._auth = undefined;
  }
}
