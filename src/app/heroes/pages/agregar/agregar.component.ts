import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interface/heroe.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width: 40%;
        border-radius:5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor( private heroeService: HeroesService,
               private activeRoute : ActivatedRoute,
               private route       : Router,
               private _snackBar   : MatSnackBar,
               private dialog      : MatDialog) { }

  ngOnInit(): void {

    if (!this.route.url.includes('editar')) {
      return
    }
    //El switchMap se utiliza para reducir el codigo al momento de realizar peticiones.
    //En este caso sin el switchMap se tendrian que resolver dos peticiones para tener el registro final.
    //Se agrega en el ngOnInit ya que esto en cuanto se ingrese al modulo una vez cargado el componenente se ejecutara lo que este aca a dentro.
    this.activeRoute.params.pipe( switchMap( ({ id }) => this.heroeService.getHeroePorId( id ) ) ).subscribe( heroe => this.heroe = heroe );
  }

  guardar(){
    
    if (this.heroe.superhero.trim().length === 0) {//Validamos para que al menos este campo no sea nulo
      return;
    }
    
    if (this.heroe.id) {//Editando registro
      this.heroeService.actualizaarHeroe( this.heroe ).subscribe( heroeActualizado => this.mostrarSnackBar('Registro Actualizado'));
    }else{//Creando registro
      this.heroeService.agregarHeroe( this.heroe ).subscribe( nuevoHeroe => {
        this.route.navigate(['/heroes/editar', nuevoHeroe.id]);
        this.mostrarSnackBar('Registro Creado');
      });
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      ( result ) => {
        if (result) {
          this.heroeService.borrarHeroe( this.heroe.id! ).subscribe( resp => {
            this.route.navigate(['/heroes']);
          });     
        }
      }
    )
  }

  //Mostrar norificaciones
  mostrarSnackBar( mensaje:string ):void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 2500
    });
  }

}
