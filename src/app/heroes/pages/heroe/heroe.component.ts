import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroe.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute, 
               private heroesServices: HeroesService,
               private router        : Router
             ) { }

  ngOnInit(): void {

     //Forma con rjxs
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesServices.getHeroePorId( id ) ),
      tap( console.log )
    )
    .subscribe( ( heroe ) => this.heroe = heroe);
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
