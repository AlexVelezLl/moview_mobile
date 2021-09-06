import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user/user.service';
import { StorageService } from './services/storage/storage.service';

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
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.statusBar.backgroundColorByHexString('#0F1321');
        this.splashScreen.hide();
      }
      this.storageService.set('id_user', 2);
      this.storageService.set(
        'session_token',
        '8|StRmx5YmSlZCFa1e1CVcNtwxkN2B2c5Veit50ggv'
      );
    });
  }

  logout(){
    this.userService.logout();
  }
}
