import {Page, NavController, NavParams} from 'ionic-framework/ionic';

@Page({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {

    constructor(nav:NavController, navParams:NavParams) {
        this.nav = nav;
    }

}