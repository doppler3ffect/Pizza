package pizza.vo.product.menu.oldDELETE;

import lombok.Data;
import pizza.vo.product.menu.ProductVariationVO;

import java.util.List;

/**
 * Created by Daniel Keiss on 28.10.2016.
 */
@Data
public class OldProductVO {

    private Integer number;
    private String category;
    private String name;
    private String description;
    private String price;
    private String priceSmall;
    private String priceMedium;
    private String priceLarge;

}