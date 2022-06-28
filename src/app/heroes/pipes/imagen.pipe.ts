import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroe.interface';

@Pipe({
  name: 'imagen'
  //pure: false  (Esta opción nos permite que cada vez que angular ejecute algun cambio en cualquier parte de la aplicación el pipe se vuelva a ejecutar, solo utilizar si es realmente necesario)
})
export class ImagenPipe implements PipeTransform {

  transform( heroe:Heroe ):string {

    if (!heroe.id && !heroe.alt_img) {
      return `assets/no-image.png`;
    }else if(  heroe.alt_img ){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }

}
