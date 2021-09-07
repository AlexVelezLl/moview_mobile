import { Component, ViewChild } from '@angular/core';
import { IonMenu, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user/user.service';
import { StorageService } from './services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SystemService } from './services/system/system.service';
import { environment } from 'src/environments/environment';
import { AlertService } from './services/alert/alert.service';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUrl: string;
  @ViewChild('menu') ionMenu: IonMenu;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userService: UserService,
    private router: Router,
    private sistema: SystemService,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      if (environment.version != 'web') {
        this.statusBar.backgroundColorByHexString('#0F1321');
        this.splashScreen.hide();
        this.settingUpNotifications();
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });
    let userLoggedIn = await this.sistema.userLoggedIn();
    if (userLoggedIn) {
      this.router.navigateByUrl('tabs/movie', { replaceUrl: true });
    }
  }

  async logout() {
    await this.userService.logout();
    this.toggleMenu();
  }

  toggleMenu() {
    this.ionMenu.close(true);
  }

  private settingUpNotifications() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });
    PushNotifications.addListener('registration', (token: Token) => {
      this.userService.setDeviceToken(token.value);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.alertService.presentToast(notification.body);
      }
    );
  }
}
