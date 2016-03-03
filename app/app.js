import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';
import * as force from './force';

@App({
    templateUrl: 'build/app.html',
    config: {},
    providers: [PropertyService, BrokerService]
})
class MyApp {

    static get parameters() {
        return [[IonicApp], [Platform]];
    }

    constructor(app, platform) {

        this.app = app;
        this.platform = platform;

        this.pages = [
            {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
            {title: 'Properties', component: PropertyListPage, icon: "home"},
            {title: 'Brokers', component: BrokerListPage, icon: "people"},
            {title: 'Favorites', component: FavoriteListPage, icon: "star"}
        ];

        this.rootPage = WelcomePage;
        this.initializeApp();
    }

    initializeApp() {
        let self = this;
        this.platform.ready().then(() => {
            force.init({
                appId: "3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZUDVyYt86Ypl8ZqBXTpzPbQNHxq7gpwKcN75BB.fpgHxzSWgwgRY6nVfvBUe",
                proxyURL: "https://dev-cors-proxy.herokuapp.com/"
            });
            force.login().then(() => {
                self.rootPage = PropertyListPage;
            });
        });
    }

    openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }

}
