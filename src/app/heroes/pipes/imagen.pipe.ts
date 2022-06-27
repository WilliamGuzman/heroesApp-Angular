import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../pages/interface/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( heroe:Heroe ):string {
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
