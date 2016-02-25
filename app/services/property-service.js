import {Injectable} from 'angular2/core';
import * as force from './../force';

/*
    Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
    from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyProperty = (property) => {
    let prettyProperty = {
        id: property.Id,
        title: property.Title__c,
        city: property.City__c,
        state: property.State__c,
        price: property.Price__c,
        priceFormatted: "$" + property.Price__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        beds: property.Beds__c,
        baths: property.Baths__c,
        description: property.Description__c,
        picture: property.Picture__c,
        thumbnail: property.Thumbnail__c,
        likes: Math.floor(Math.random() * 20) + 1 // Likes are simulated: random number between 0 and 20. See "Favorites" for similar functionality.
    };
    prettyProperty.broker = property.Broker__r ?
        {
            id: property.Broker__r.Id,
            name: property.Broker__r.Name,
            title: property.Broker__r.Title__c,
            picture: property.Broker__r.Picture__c
        } : {};
    return prettyProperty;
};

let prettifyFavorite = (favorite) => {
    return {
        id: favorite.Id,
        property: prettifyProperty(favorite.Property__r)
    };
};

@Injectable()
export class PropertyService {

    findAll() {
        return force.query(`SELECT id,
                                   title__c,
                                   city__c,
                                   state__c,
                                   price__c,
                                   thumbnail__c
                            FROM property__c`)
                .then(response => response.records.map(prettifyProperty));
    }


    findById(id) {
        return force.retrieve('Property__c', id,
                                `id,
                                title__c,
                                city__c,
                                state__c,
                                price__c,
                                picture__c,
                                beds__c,baths__c,
                                description__c,
                                broker__r.Id,
                                broker__r.Name,
                                broker__r.Title__c,
                                broker__r.Picture__c`)
            .then(prettifyProperty);
    }

    getFavorites() {
        return force.query(`SELECT id,
                                   Property__r.Id,
                                   Property__r.Title__c,
                                   Property__r.City__c,
                                   Property__r.State__c,
                                   Property__r.Price__c,
                                   Property__r.Thumbnail__c
                            FROM favorite__c
                            WHERE user__c='${force.getUserId()}'`)
            .then(response => response.records.map(favorite => prettifyFavorite(favorite)));
    }

    favorite(property) {
        return force.create('Favorite__c', {User__c: force.getUserId(), Property__c: property.id});
    }

    unfavorite(favorite) {
        return force.del('Favorite__c', favorite.id);
    }

    like(property) {
    }

}