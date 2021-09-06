import { Component, ViewChild } from '@angular/core';
import { IonMenu, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user/user.service';
import { StorageService } from './services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.statusBar.backgroundColorByHexString('#0F1321');
        this.splashScreen.hide();
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });
  }

  async logout() {
    await this.userService.logout();
    this.toggleMenu();
  }

  toggleMenu() {
    this.ionMenu.close(true);
  }
}
