import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'style-loader!./login.scss';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { SC } from '../../helper/sc';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {
  public form:FormGroup;
  public userName:AbstractControl;
  public userPassword:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private router: Router, private authService: AuthService, private sc: SC) {
    this.form = fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'userPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.userName = this.form.controls['userName'];
    this.userPassword = this.form.controls['userPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.login(values).subscribe(res => {
        if(res && res['status'] == 200) {

        } else {
          this.sc.alert(res['message']);
        }
      });
    }
  }
}
