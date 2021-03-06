/// <reference path="../thirdParty/jquery.d.ts" />
/// <reference path="../share/Constants.ts" />
/// <reference path="../share/WebServiceAccess.ts" />
/// <reference path="IProductCatalog.ts" />
/// <reference path="IAddition.ts" />
/// <reference path="IOrder.ts" />

namespace WebApplication.UserOrder
{
    export class OrderService
    {
        public static loadProductCatalog(getProductCatalog: (productCatalog: IProductCatalog) => void): void
        {
            WebServiceAccess.ajaxGet(WebService.productCatalogActive, getProductCatalog);
        }

        public static loadAdditionInfo(getAddition: (addition: IAdditions) => void): void
        {
            WebServiceAccess.ajaxGet(WebService.addition, getAddition);
        }

        public static loadUserInfo(getUser: (user: IUser) => void): void
        {
            WebServiceAccess.ajaxGet(WebService.currentUser, getUser);
        }

        public static sendOrderForUser(sendOrder: IOrder, onSuccess: (xhr: any) => void)
        {
            WebServiceAccess.ajaxPost(WebService.order, sendOrder, onSuccess);
        }
    }
}