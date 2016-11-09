-- User
CREATE TABLE USER
(
  USER_ID           INTEGER        NOT NULL AUTO_INCREMENT,
  USER_NAME         VARCHAR(255)   NOT NULL UNIQUE,
  PASSWORD          VARCHAR(255),
  PASSWORD_TYPE     VARCHAR(255),
  IS_ADMIN          BOOLEAN        NOT NULL,
  FIRST_NAME        VARCHAR(255),
  LAST_NAME         VARCHAR(255),
  DISCOUNT          DECIMAL(10, 2) NOT NULL,
  CREATION_DATE     TIMESTAMP,
  MODIFICATION_DATE TIMESTAMP,
  PRIMARY KEY (USER_ID)
);
CREATE SEQUENCE USER_ID_SEQ;

-- Product Catalog
CREATE TABLE PRODUCT_CATALOG
(
  PRODUCT_CATALOG_ID INTEGER      NOT NULL AUTO_INCREMENT,
  NAME               VARCHAR(255) NOT NULL,
  CREATION_DATE      TIMESTAMP,
  PRIMARY KEY (PRODUCT_CATALOG_ID)
);
CREATE SEQUENCE PRODUCT_CATALOG_ID_SEQ;

-- Product Category
CREATE TABLE PRODUCT_CATEGORY
(
  PRODUCT_CATEGORY_ID INTEGER      NOT NULL AUTO_INCREMENT,
  NAME                VARCHAR(255) NOT NULL,
  PRODUCT_CATALOG_ID  INTEGER      NOT NULL,
  CREATION_DATE       TIMESTAMP,
  PRIMARY KEY (PRODUCT_CATEGORY_ID),
  FOREIGN KEY (PRODUCT_CATALOG_ID) REFERENCES PRODUCT_CATALOG (PRODUCT_CATALOG_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE PRODUCT_CATEGORY_ID_SEQ;

-- Product Group
CREATE TABLE PRODUCT_GROUP
(
  PRODUCT_GROUP_ID    INTEGER      NOT NULL AUTO_INCREMENT,
  NAME                VARCHAR(255) NOT NULL,
  PRODUCT_CATEGORY_ID INTEGER      NOT NULL,
  CREATION_DATE       TIMESTAMP,
  PRIMARY KEY (PRODUCT_GROUP_ID),
  FOREIGN KEY (PRODUCT_CATEGORY_ID) REFERENCES PRODUCT_CATEGORY (PRODUCT_CATEGORY_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE PRODUCT_GROUP_ID_SEQ;

-- Product
CREATE TABLE PRODUCT
(
  PRODUCT_ID       INTEGER      NOT NULL AUTO_INCREMENT,
  NUMBER           INTEGER,
  NAME             VARCHAR(255) NOT NULL,
  DESCRIPTION      CLOB,
  PRODUCT_GROUP_ID INTEGER      NOT NULL,
  CREATION_DATE    TIMESTAMP,
  PRIMARY KEY (PRODUCT_ID),
  FOREIGN KEY (PRODUCT_GROUP_ID) REFERENCES PRODUCT_GROUP (PRODUCT_GROUP_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE PRODUCT_ID_SEQ;

-- Product Variation
CREATE TABLE PRODUCT_VARIATION (
  PRODUCT_VARIATION_ID INTEGER      NOT NULL AUTO_INCREMENT,
  NAME                 VARCHAR(255) NOT NULL,
  PRICE                DECIMAL      NOT NULL,
  PRODUCT_ID           INTEGER      NOT NULL,
  CREATION_DATE        TIMESTAMP,
  PRIMARY KEY (PRODUCT_VARIATION_ID),
  FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT (PRODUCT_ID) ON UPDATE CASCADE,
);
CREATE SEQUENCE PRODUCT_VARIATION_ID_SEQ;

-- Additional category
CREATE TABLE ADDITIONAL_CATEGORY
(
  ADDITIONAL_CATEGORY_ID INTEGER       NOT NULL AUTO_INCREMENT,
  NAME                   VARCHAR(255)  NOT NULL,
  DUTY                   BOOLEAN       NOT NULL,
  PRODUCT_IDS            VARCHAR(1024) NOT NULL,
  CREATION_DATE          TIMESTAMP,
  PRIMARY KEY (ADDITIONAL_CATEGORY_ID)
);
CREATE SEQUENCE ADDITIONAL_CATEGORY_ID_SEQ;

-- Additional
CREATE TABLE ADDITIONAL
(
  ADDITIONAL_ID          INTEGER NOT NULL AUTO_INCREMENT,
  DESCRIPTION            CLOB    NOT NULL,
  ADDITIONAL_CATEGORY_ID INTEGER NOT NULL,
  CREATION_DATE          TIMESTAMP,
  PRIMARY KEY (ADDITIONAL_ID),
  FOREIGN KEY (ADDITIONAL_CATEGORY_ID) REFERENCES ADDITIONAL_CATEGORY (ADDITIONAL_CATEGORY_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE ADDITIONAL_ID_SEQ;

-- Additional Price
CREATE TABLE ADDITIONAL_PRICE
(
  ADDITIONAL_PRICE_ID INTEGER      NOT NULL AUTO_INCREMENT,
  NAME                VARCHAR(255) NOT NULL,
  ADDITIONAL_ID       INTEGER      NOT NULL,
  PRICE               DECIMAL      NOT NULL,
  CREATION_DATE       TIMESTAMP,
  PRIMARY KEY (ADDITIONAL_PRICE_ID),
  FOREIGN KEY (ADDITIONAL_ID) REFERENCES ADDITIONAL (ADDITIONAL_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE ADDITIONAL_PRICE_ID_SEQ;

-- Bulk Order
CREATE TABLE BULK_ORDER
(
  BULK_ORDER_ID     INTEGER      NOT NULL AUTO_INCREMENT,
  CATALOG_ID        INTEGER      NOT NULL,
  NAME              VARCHAR(255) NOT NULL,
  ACTIVE_UNTIL      TIMESTAMP    NOT NULL,
  CREATION_DATE     TIMESTAMP,
  MODIFICATION_DATE TIMESTAMP,
  PRIMARY KEY (BULK_ORDER_ID)
);
CREATE SEQUENCE BULK_ORDER_ID_SEQ;

-- Order
CREATE TABLE ORDER_USER
(
  ORDER_USER_ID        INTEGER NOT NULL AUTO_INCREMENT,
  AMOUNT               DECIMAL NOT NULL,
  BULK_ORDER_ID        INTEGER NOT NULL,
  PRODUCT_ID           INTEGER NOT NULL,
  PRODUCT_VARIATION_ID INTEGER NOT NULL,
  CREATION_DATE        TIMESTAMP,
  MODIFICATION_DATE    TIMESTAMP,
  PRIMARY KEY (ORDER_USER_ID),
  FOREIGN KEY (BULK_ORDER_ID) REFERENCES BULK_ORDER (BULK_ORDER_ID) ON UPDATE CASCADE,
  FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT (PRODUCT_ID) ON UPDATE CASCADE,
  FOREIGN KEY (PRODUCT_VARIATION_ID) REFERENCES PRODUCT_VARIATION (PRODUCT_VARIATION_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE ORDER_ID_SEQ;

-- Order Additions
CREATE TABLE ORDER_USER_ADDITIONS
(
  ORDER_USER_ADDITIONS_ID INTEGER NOT NULL AUTO_INCREMENT,
  ORDER_USER_ID           INTEGER NOT NULL,
  ADDITIONAL_ID           INTEGER NOT NULL,
  ADDITIONAL_PRICE_ID     INTEGER NOT NULL,
  CREATION_DATE           TIMESTAMP,
  MODIFICATION_DATE       TIMESTAMP,
  PRIMARY KEY (ORDER_USER_ADDITIONS_ID),
  FOREIGN KEY (ORDER_USER_ID) REFERENCES ORDER_USER (ORDER_USER_ID) ON UPDATE CASCADE,
  FOREIGN KEY (ADDITIONAL_ID) REFERENCES ADDITIONAL (ADDITIONAL_ID) ON UPDATE CASCADE,
  FOREIGN KEY (ADDITIONAL_PRICE_ID) REFERENCES ADDITIONAL_PRICE (ADDITIONAL_PRICE_ID) ON UPDATE CASCADE
);
CREATE SEQUENCE ORDER_ADDITIONS_ID_SEQ;