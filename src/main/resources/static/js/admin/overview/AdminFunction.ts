/// <reference path="../../thirdParty/jquery.d.ts" />
/// <reference path="AdminService.ts" />
/// <reference path="../../Constants.ts" />
/// <reference path="../productCatalog/IProductCatalogInfo.ts" />
/// <reference path="IBulkOrder.ts" />


namespace WebApplication.Admin.Overview
{
    $(document).ready(() =>
    {
        new AdminFunction();
    });
    /*$(document).ready(() =>
    {
        $('#timepicker.startTime').timepicker( {
            hourText: 'Stunde',             // Define the locale text for "Hours"
            minuteText: 'Minute',         // Define the locale text for "Minute"
            amPmText: ['', ''],     // Display text for AM PM
            showAnim: 'blind'
        } );
    });*/

    export class AdminFunction
    {
        private _adminCardBtn: JQuery = null;
        private _adminTimepicker: JQuery = null;
        private _adminTimepickerLabel: JQuery = null;
        private _adminUploadCatalogBtn: JQuery = null;
        private _adminCatalogPostfixLbl: JQuery = null;
        private _adminCatalogPrefixLbl: JQuery = null;
        private _adminCatalogCB: JQuery = null;
        private _adminCardErrorLbl: JQuery = null;
        private _adminUMGMTErrorLbl: JQuery = null;
        private _adminPrintErrorLbl: JQuery = null;
        private _adminUploadErrorLbl: JQuery = null;

        private _bulkOrder: IBulkOrder[] = null;
        private _currentBulkOrder: IBulkOrder = null;
        private _newBulkOrder: IBulkOrder;

        private _availableProductCatalogs: IProductCatalogInfo[] = null;

        private _errorResponse: IErrorResponse = null;

        private _adminActivateCtlgBtn: JQuery = null;


        constructor()
        {
            console.log("test2");
            this._adminCardBtn = $(AdminOverviewSelectors.adminCardBtn);
            this._adminCardBtn.hover(function(){$(this).text("Derzeit ist keine Sammelbestellung aktiv");},function(){$(this).text("Warenkorb");});
            this._adminCardBtn.on("click",function(){window.location.replace('/admin/ordermanagement')});


            this._adminUploadCatalogBtn = $(AdminOverviewSelectors.adminUploadCatalogBtn);

            this._adminTimepicker = $(AdminOverviewSelectors.adminTimepicker);

            this._adminCatalogPrefixLbl = $(AdminOverviewSelectors.adminCatalogPrefixLbl);
            this._adminCatalogPostfixLbl = $(AdminOverviewSelectors.adminCatalogPostfixLbl);
            this._adminCatalogCB = $(AdminOverviewSelectors.adminCatalogCB);

            this._adminCardErrorLbl = $(AdminOverviewSelectors.adminCardErrorLbl);

            this._adminUMGMTErrorLbl = $(AdminOverviewSelectors.adminUMGMTErrorLbl);

            this._adminPrintErrorLbl = $(AdminOverviewSelectors.adminPrintErrorLbl);

            this._adminUploadErrorLbl = $(AdminOverviewSelectors.adminUploadErrorLbl);

            this._adminTimepickerLabel = $(AdminOverviewSelectors.adminTimepickerLabel);

            this._adminActivateCtlgBtn = $(AdminOverviewSelectors.adminActivateCtlgBtn);

            this.resetGUI();
            this.getProductCatalogs();
            this.getCurrentBulkOrder();

        }

        public validateTime() : boolean {
            console.log("test2");

            let isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$/.test(this._adminTimepicker.val());

            if (isValid) {
                this._adminTimepicker.toggleClass("admin-inputField_time_error",false);
                this._adminActivateCtlgBtn.toggleClass("admin-submitButton-disabled",false);
                this._adminActivateCtlgBtn.toggleClass("admin-submitButton-enabled",true);
                this._adminTimepickerLabel.hide();
            } else {
                this._adminTimepicker.toggleClass("admin-inputField_time_error",true);
                this._adminActivateCtlgBtn.toggleClass("admin-submitButton-disabled",true);
                this._adminActivateCtlgBtn.toggleClass("admin-submitButton-enabled",false);
                this._adminTimepickerLabel.text("Ungültige Uhrzeit");
                this._adminTimepickerLabel.show();
            }

            return isValid;
        }

        private deaktivateBulkOrder(): void{
            AdminService.deactivateBulkOrder(this._currentBulkOrder.bulkOrderId/*,

                bulkOrder => {
                    console.log("deaktivated");
                    this._currentBulkOrder = bulkOrder;
                    this._adminTimepicker.toggleClass("admin-inputField_time_error",false);
                    this._adminActivateCtlgBtn.toggleClass("admin-submitButton-disabled",false);
                    this._adminActivateCtlgBtn.toggleClass("admin-submitButton-enabled",true);
                    this._adminActivateCtlgBtn.on("click", () => this.activateBulkOrder());
                    this._adminTimepickerLabel.hide();
                },
                errorResponse => {
                    this._errorResponse = errorResponse.responseJSON;
                    this._adminTimepickerLabel.text(this._errorResponse.message);
                    this._adminTimepicker.toggleClass("admin-inputField_time_error",true);
                    this._adminActivateCtlgBtn.toggleClass("admin-submitButton-disabled",true);
                    this._adminActivateCtlgBtn.toggleClass("admin-submitButton-enabled",false);
                    this._adminActivateCtlgBtn.off();
                    this._adminTimepickerLabel.show();

                }*/
            );
            this.resetGUI();
            this.getCurrentBulkOrder();
        }

        private activateBulkOrder(): void{
            if(this.validateTime()){
                let time = this._adminTimepicker.val().split(":");
                let endDate = new Date();
                endDate.setHours(time[0],time[1]);

                let _newBulkOrder: IBulkOrder = {
                    bulkOrderId: 1,
                    catalogId: 1,
                    name: "test",
                    activeUntil: endDate.getTime(),
                    creationDate: null,
                    modificationDate: null,
                    isActive: null
                };

                AdminService.activateBulkOrder(_newBulkOrder,
                    bulkOrder => {
                        this._currentBulkOrder = bulkOrder;
                        this._adminTimepicker.toggleClass("admin-inputField_time_error",false);
                        this._adminActivateCtlgBtn.toggleClass("admin-submitButton-disabled",false);
                        this._adminActivateCtlgBtn.toggleClass("admin-submitButton-enabled",true);
                        this._adminActivateCtlgBtn.on("click", () => this.activateBulkOrder());
                        this._adminTimepickerLabel.hide();
                        this.resetGUI();
                        this.getCurrentBulkOrder();
                    },
                    errorResponse => {
                        this._errorResponse = errorResponse.responseJSON;
                        this._adminTimepickerLabel.text(this._errorResponse.message);
                        this._adminTimepicker.toggleClass("admin-inputField_time_error",true);
                        this._adminActivateCtlgBtn.toggleClass("admin-submitButton-disabled",true);
                        this._adminActivateCtlgBtn.toggleClass("admin-submitButton-enabled",false);
                        this._adminActivateCtlgBtn.off();
                        this._adminTimepickerLabel.show();

                    }
                );
            }
        }

        private getProductCatalogs(): void {
            AdminService.loadProductCatalogs(availableProductCatalogs => {
                this._availableProductCatalogs = availableProductCatalogs;
                for(let i = 0; i < this._availableProductCatalogs.length; i++) {
                    this._adminCatalogCB.append( new Option(this._availableProductCatalogs[i].name,i.toString()));
                }
                console.log(this._adminCatalogCB.children('option').length);
                if(this._adminCatalogCB.children('option').length>0){
                    this._adminCatalogCB.show();
                    this._adminCatalogPrefixLbl.text("Warenkorb für");
                    this._adminCatalogPostfixLbl.text(" aktivieren bis");
                    this._adminTimepicker.show();
                    this._adminTimepicker.prop('readonly', false);
                    this._adminTimepicker.on("change", () => this.validateTime());
                }
            });
        }

        private resetGUI(): void {
            this._adminCardBtn.hover(function(){$(this).text("Derzeit ist keine Sammelbestellung aktiv");},function(){$(this).text("Warenkorb");});
            this._adminCardBtn.toggleClass("admin-button-enabled",false);
            this._adminCardBtn.toggleClass("admin-button-disabled",true);
            this._adminTimepicker.hide();
            this._adminCatalogCB.hide();
            this._adminCardErrorLbl.hide();
            this._adminUMGMTErrorLbl.hide();
            this._adminPrintErrorLbl.hide();
            this._adminUploadErrorLbl.hide();
            this._adminTimepickerLabel.hide();
            this._adminActivateCtlgBtn.on("click", () => this.activateBulkOrder());
            this._adminActivateCtlgBtn.text("Aktivieren");
        }

        private getCurrentBulkOrder(): void
        {
            AdminService.loadBulkOrders(bulkOrder =>
            {
                this._bulkOrder = bulkOrder;
                console.log("bulkorderloaded");
                console.log(this._bulkOrder);

                let currentTime = new Date().getTime();
                for(let i = 0; i < this._bulkOrder.length; i++)
                {
                    console.log("catalog");
                    if((this._bulkOrder[i].activeUntil - currentTime) > 0){
                        console.log("catalog is active1");
                        this._currentBulkOrder = this._bulkOrder[i];
                    }
                }

                if(this._currentBulkOrder){

                    console.log("catalog is active2");
                    this._adminCardBtn.toggleClass("admin-button-disabled",false);
                    this._adminCardBtn.toggleClass("admin-button-enabled",true);
                    this._adminCardBtn.off();

                    this._adminCatalogCB.hide();
                    this._adminCatalogPostfixLbl.hide();

                    this._adminCatalogPrefixLbl.text("Warenkorb \""+this._currentBulkOrder.name+"\" ist noch aktiv bis");
                    this._adminTimepicker.show();
                    this._adminTimepicker.prop('readonly',true);
                    console.log(new Date(this._currentBulkOrder.activeUntil).toString());
                    this._adminTimepicker.val(new Date(this._currentBulkOrder.activeUntil).toTimeString().substr(0,5));
                    this._adminTimepicker.off();

                    this._adminActivateCtlgBtn.off();
                    this._adminActivateCtlgBtn.text("Abbrechen");
                    this._adminActivateCtlgBtn.on("click", () => this.deaktivateBulkOrder());

                } /*else {

                    console.log("no current catalog");
                    if(this._availableProductCatalog) {
                        console.log("catalog");
                        this._adminCatalogLbl.text("Warenkorb für \"" + this._availableProductCatalog.name + "\" aktivieren bis");
                        this._adminTimepicker.show();
                        this._adminTimepicker.prop('readonly', false);
                        this._adminTimepicker.on("change", () => this.validateTime());
                    }
                }*/
            });
        }
    }




}





