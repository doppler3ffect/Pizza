/// <reference path="../thirdParty/jquery.d.ts" />
/// <reference path="../share/Constants.ts" />
/// <reference path="IAddition.ts" />
/// <reference path="ShowAdditionDialog.ts" />

namespace WebApplication.UserOrder
{
    $(document).ready(() =>
    {
        new UserOrder();
    });

    export class UserOrder
    {
        private _createProductCatalogHtml: CreateProductCatalogHtml = null;
        private _additional: IAdditions = null;

        constructor()
        {
            this._createProductCatalogHtml = new CreateProductCatalogHtml();
            this._createProductCatalogHtml.start( (priceSize, productId) =>
            {
                if (this._additional == null) this.loadAddition();
                console.log(this._additional);
                var showAdditionDialog = new ShowAdditionDialog(this._additional, priceSize, productId);

            });
        }

        private loadAddition()
        {
            OrderService.loadAdditionInfo( getAddition => {
                this._additional = getAddition;
            });
        }
    }
}