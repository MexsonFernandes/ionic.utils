import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Inject } from "@angular/core";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser/ngx";

export class Utility {
  constructor(
    private toast: ToastController,
    private alert: AlertController,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private loading: LoadingController,
    private iab: InAppBrowser
  ) {}

  app_browser_options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes", //Windows only
  };

  async showLoading(message: string, duration = 2000) {
    const loading = await this.loading.create({
      message: message,
      duration: duration,
    });
    await loading.present();
  }

  async showToast(message: string, duration = 2000, position = null) {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: position || "bottom",
    });
    toast.present();
  }

  async showAlert(header: string, message: string, buttonText = "Ok") {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [buttonText],
    });
    await alert.present();
  }

  /*
   ** Route app with array ['route', 'value']
   */
  navigateWithArray(arr: [any], param = {}) {
    this.router.navigate(arr, param);
  }

  navigateWithUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  getStorageData(storage_key: string) {
    return this.storage.get(JSON.parse(storage_key));
  }

  putStorageData(storage_key: string, data: any) {
    this.storage.set(storage_key, JSON.stringify(data));
  }

  deleteStorageData(storage_key: string) {
    this.storage.remove(storage_key);
  }

  getUTCTimestamp() {
    return new Date().toISOString();
  }

  getCurrentLink() {
    return window.location.pathname + window.location.search;
  }

  showInAppBrowser(link, target = "_self", options = this.app_browser_options) {
    this.iab.create(link, target, options);
  }
}
