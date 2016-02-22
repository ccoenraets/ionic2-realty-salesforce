import {App, IonicApp, Platform} from 'ionic/ionic';
import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';
import * as force from './force';

@App({
    templateUrl: 'build/app.html',
    config: {
        serverURL: "http://localhost:5000"
    }, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [PropertyService, BrokerService]
})
class MyApp {

    constructor(app:IonicApp, platform:Platform) {

        // set up our app
        this.app = app;
        this.platform = platform;
        this.initializeApp();

        this.pages = [
            {title: 'Welcome', component: WelcomePage},
            {title: 'Properties', component: PropertyListPage, icon: "home"},
            {title: 'Brokers', component: BrokerListPage, icon: "people"},
            {title: 'Favorites', component: FavoriteListPage, icon: "star"}
        ];

        // make WelcomePage the root (or first) page
        this.rootPage = WelcomePage;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (window.StatusBar) {
                window.StatusBar.styleDefault();
            }
            force.init({
                appId: "3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZUDVyYt86Ypl8ZqBXTpzPbQNHxq7gpwKcN75BB.fpgHxzSWgwgRY6nVfvBUe",
                proxyURL: "https://dev-cors-proxy.herokuapp.com/"
            });
            force.login().then(() => {
                alert('loggedin');
                // set our app's pages

            });
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.app.getComponent('leftMenu').close();
        // navigate to the new page if it is not the current page
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }

}
