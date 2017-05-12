import { Injectable } from '@angular/core';
import { OwnMdSnackBar } from '../theme/snack-bar/snack-bar';
import { MdSnackBarConfig } from '../theme/snack-bar/snack-bar-config';



@Injectable()
export class SC {
  constructor(private snackBar: OwnMdSnackBar){
  }
  public alert(message: string,action='',config:MdSnackBarConfig={duration:2000}): void{
    config.viewContainerRef = null;
    this.snackBar.open(message, action, config);
  }
}
