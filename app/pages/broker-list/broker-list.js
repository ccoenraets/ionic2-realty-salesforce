import {OnInit} from 'angular2/core';
import {Page, NavController} from 'ionic/ionic';
import {BrokerDetailsPage} from '../broker-details/broker-details';
import {BrokerService} from '../../services/broker-service';

@Page({
    templateUrl: 'build/pages/broker-list/broker-list.html'
})
export class BrokerListPage {

    constructor(nav:NavController, brokerService:BrokerService) {
        this.nav = nav;
        this.brokerService = brokerService;
    }

    ngOnInit() {
        this.brokerService.findAll().then(brokers => this.brokers = brokers);
    }

    itemTapped(event, broker) {
        this.nav.push(BrokerDetailsPage, {
            broker: broker
        });
    }

}