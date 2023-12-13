import { LightningElement, api, wire } from 'lwc';

// imports
// import getSimilarBoats
import { NavigationMixin } from 'lightning/navigation';
import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats';
export default class SimilarBoats extends NavigationMixin(LightningElement) {
    // Private
    relatedBoats;
    boatId;
    error;

    // public
    @api
    get recordId() {
        // returns the boatId
        return this.boatId;
    }
    set recordId(value) {
        // sets the boatId value
        this.setAttribute("boatId", value); 
        // sets the boatId attribute
        this.boatId=value;
    }

    // public
    @api
    similarBy;

    // Wire custom Apex call, using the import named getSimilarBoats
    // Populates the relatedBoats list
    @wire(getSimilarBoats, { boatId:'$boatId', similarBy:'$similarBy' })
    similarBoats({ error, data }) {
        if (data) {
            this.relatedBoats=data;
        } else if(error){
            this.error=error;
        }
    }
    get getTitle() {
        return 'Similar boats by ' + this.similarBy;
    }
    get noBoats() {
        return !(this.relatedBoats && this.relatedBoats.length > 0);
    }

    // Navigate to record page
    openBoatDetailPage(event) { 
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.boatId,
                objectApiName:'Boat__c',
                actionName: 'view',
            },
        });
    }
}
