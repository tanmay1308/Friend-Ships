import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = true;
  
  // Handles loading event
  handleLoading() {
    this.isLoading=true;
   }
  
  // Handles done loading event
  handleDoneLoading() {
    this.isLoading= false;
    // setTimeout(()=>{
    //   this.isLoading= false;
    // },300);
    
   }
  
  // Handles search boat event
  // This custom event comes from the form
  searchBoats(event) { 
    //vaule is being passed
    //event.detail holds the Id of boat type
    console.log(event.detail.boatTypeId);
    const boatTypeId = event.detail.boatTypeId;
    this.template.querySelector(["c-boat-search-results"]).searchBoats(boatTypeId);
  }
  
  createNewBoat() {
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Boat__c',
            actionName: 'new'
        }
    });
  }
}