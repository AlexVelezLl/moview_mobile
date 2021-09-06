import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user/user.service';
import { StorageService } from './services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedTab = 'movie';
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storageService: StorageService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.url.subscribe((url) => {
      console.log(url);
    });
  }

  logout() {
    this.userService.logout();
  }
}
