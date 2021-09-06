import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SystemService } from 'src/app/services/system/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private _loginForm: FormGroup;
  constructor(
    private alertService: AlertService,
    private sistema: SystemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this._loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async logIn() {
    const user = this._loginForm.get('user').value;
    const password = this._loginForm.get('password').value;
    await this.alertService.presentLoading('Iniciando sesión...');
    try {
      await this.sistema.login(user, password);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error) {
      await this.alertService.presentToast('Usuario o contraseña incorrectas');
    }
    this.alertService.dismissLoading();
  }
  public get loginForm() {
    return this._loginForm;
  }
}
