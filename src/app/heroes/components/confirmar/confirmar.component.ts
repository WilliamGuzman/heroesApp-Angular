import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Heroe)// Esta inyección es para poder enviar la información al componente que mostrara el plugin dialog
              { }

  ngOnInit(): void {}

  borrar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close();
  }
}
