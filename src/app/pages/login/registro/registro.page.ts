import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SystemService } from 'src/app/services/system/system.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  private _registerForm: FormGroup;
  public devHeight = this.platform.height();
  constructor(
    private alertService: AlertService,
    private sistema: SystemService,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.initForm();
    console.log(this.devHeight);
  }

  initForm() {
    this._registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
  }

  async register() {
    if (this._registerForm.invalid) {
      await this.alertService.presentToast(
        'Por favor completar todos los campos'
      );
      return;
    }
    const name = this._registerForm.get('name').value;
    const userform = this._registerForm.get('user').value;
    const password = this._registerForm.get('password').value;
    const password2 = this._registerForm.get('passwordConfirmation').value;
    if (password != password2) {
      await this.alertService.presentToast('Las contraseñas no coinciden');
      return;
    }
    await this.alertService.presentLoading('Registrando usuario...');
    try {
      const { user, token } = await this.sistema.register(
        name,
        userform,
        password
      );
      await this.sistema.afterRegister(user, token);

      //this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error) {
      console.log(error);
      this.alertService.dismissLoading();
      await this.alertService.presentToast('Error al crear usuario');
      return;
    }
    this.alertService.presentToast('Usuario creado con éxito');
    this.router.navigateByUrl('tabs/movie', { replaceUrl: true });
    this.alertService.dismissLoading();
  }

  public get registerForm() {
    return this._registerForm;
  }
}
