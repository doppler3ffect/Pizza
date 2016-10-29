package pizza.vo.product.menu;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by Daniel Keiss on 29.10.2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductCatalogInfoVO {

    private Integer productCatalogId;

    private String name;

}
