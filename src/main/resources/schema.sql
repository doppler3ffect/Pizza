CREATE TABLE USER
(
  ID            INTEGER      NOT NULL AUTO_INCREMENT,
  ALIAS         VARCHAR(255) NOT NULL,
  FIRSTNAME     VARCHAR(255),
  LASTNAME      VARCHAR(255),
  CREATION_DATE DATE,
  PRIMARY KEY (ID)
);

CREATE SEQUENCE ID_SEQ
START WITH 1
INCREMENT BY 100
CACHE 100;