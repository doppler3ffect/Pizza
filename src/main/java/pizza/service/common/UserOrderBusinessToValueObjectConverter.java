package pizza.service.common;

import pizza.domain.order.UserOrder;
import pizza.domain.order.UserOrderAdditional;
import pizza.domain.product.Product;
import pizza.domain.product.ProductVariation;
import pizza.domain.product.additional.Additional;
import pizza.domain.product.additional.AdditionalPrice;
import pizza.domain.user.User;
import pizza.vo.order.UserOrderAdditionalVO;
import pizza.vo.order.UserOrderDetailsVO;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Daniel Keiss on 08.11.2016.
 */
public class UserOrderBusinessToValueObjectConverter {

	public static List<UserOrderDetailsVO> getUserOrdersFromBOs(List<UserOrder> userOrders) {
		return userOrders.stream().map(UserOrderBusinessToValueObjectConverter::getUserOrderFromBO).collect(Collectors.toList());
	}

	public static UserOrderDetailsVO getUserOrderFromBO(UserOrder userOrder) {
		UserOrderDetailsVO userOrderDetailsVO = new UserOrderDetailsVO();
		userOrderDetailsVO.setUserOrderId(userOrder.getUserOrderId());
		User user = userOrder.getUser();
		userOrderDetailsVO.setUserId(user.getUserId());
		userOrderDetailsVO.setFirstName(user.getFirstName());
		userOrderDetailsVO.setLastName(user.getLastName());
		userOrderDetailsVO.setUserName(user.getUserName());
		Product product = userOrder.getProduct();
		if (product.getProductGroup() != null) {
			userOrderDetailsVO.setProductGroupName(product.getProductGroup().getName());
			if (product.getProductGroup().getProductCategory() != null) {
				userOrderDetailsVO.setProductCategoryName(product.getProductGroup().getProductCategory().getName());
			}
		}
		userOrderDetailsVO.setProductId(product.getProductId());
		userOrderDetailsVO.setProductName(product.getName());
		userOrderDetailsVO.setProductNumber(product.getNumber());
		ProductVariation productVariation = userOrder.getProductVariation();
		userOrderDetailsVO.setProductVariationId(productVariation.getProductVariationId());
		userOrderDetailsVO.setProductVariationName(productVariation.getName().name());
		if (userOrder.getUserOrderAdditionals() != null) {
			userOrderDetailsVO.setUserOrderAdditionals(getUserOrderAdditionalsFromBOs(userOrder.getUserOrderAdditionals()));
		}
		userOrderDetailsVO.setSum(userOrder.getAmount());
		userOrderDetailsVO.setNumber(userOrder.getNumber());
		userOrderDetailsVO.setPaid(userOrder.getPaid());
		return userOrderDetailsVO;
	}

	private static List<UserOrderAdditionalVO> getUserOrderAdditionalsFromBOs(List<UserOrderAdditional> userOrderAdditionals) {
		return userOrderAdditionals.stream().map(UserOrderBusinessToValueObjectConverter::getUserOrderAdditionalsFromBO)
				.collect(Collectors.toList());
	}

	private static UserOrderAdditionalVO getUserOrderAdditionalsFromBO(UserOrderAdditional userOrderAdditional) {
		UserOrderAdditionalVO userOrderAdditionalVO = new UserOrderAdditionalVO();
		Additional additional = userOrderAdditional.getAdditional();
		userOrderAdditionalVO.setAdditionalId(additional.getAdditionalId());
		userOrderAdditionalVO.setAdditionalDescription(additional.getDescription());
		AdditionalPrice additionalPrice = userOrderAdditional.getAdditionalPrice();
		userOrderAdditionalVO.setAdditionalPriceId(additionalPrice.getAdditionalPriceId());
		userOrderAdditionalVO.setAdditionalPriceName(additionalPrice.getName());
		userOrderAdditionalVO.setUserOrderAdditionalId(userOrderAdditional.getUserOrderAdditionalId());
		userOrderAdditionalVO.setUserOrderId(userOrderAdditional.getUserOrder().getUserOrderId());
		return userOrderAdditionalVO;
	}

}