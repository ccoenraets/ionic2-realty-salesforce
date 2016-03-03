import {OnInit} from 'angular2/core';
import {Page, NavController} from 'ionic-framework/ionic';
import {PropertyDetailsPage} from '../property-details/property-details';
import {PropertyService} from '../../services/property-service';

@Page({
    templateUrl: 'build/pages/favorite-list/favorite-list.html'
})
export class FavoriteListPage {

    static get parameters() {
        return [[NavController], [PropertyService]];
    }

    constructor(nav, propertyService) {
        this.nav = nav;
        this.propertyService = propertyService;
    }

    ngOnInit() {
        this.loadFavorites();
    }

    loadFavorites() {
        this.propertyService.getFavorites().then(favorites => this.favorites = favorites);
    }

    itemTapped(event, favorite) {
        this.nav.push(PropertyDetailsPage, {
            property: favorite.property
        });
    }

    deleteItem(event, favorite) {
        this.propertyService.unfavorite(favorite).then(() => this.loadFavorites());
    }

}
