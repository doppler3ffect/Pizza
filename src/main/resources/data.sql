-- User
INSERT INTO USER (USER_ID, USER_NAME, PASSWORD, PASSWORD_TYPE, IS_ADMIN, FIRST_NAME, LAST_NAME, DISCOUNT, CREATION_DATE)
VALUES (1, 'admin@test.de', 'password', 'PLAIN', TRUE, 'Bruce', 'Wayne', 10, now());
INSERT INTO USER (USER_ID, USER_NAME, IS_ADMIN, FIRST_NAME, LAST_NAME, DISCOUNT, CREATION_DATE)
VALUES (2, 'user@test.de', FALSE, 'Hans', 'Maulwurf', 0, now());
INSERT INTO USER (USER_ID, USER_NAME, PASSWORD, PASSWORD_TYPE, IS_ADMIN, FIRST_NAME, LAST_NAME, DISCOUNT, CREATION_DATE)
VALUES (3, 'daniel.keiss@gmail.com', null, 'PLAIN', TRUE, 'Daniel', 'Keiss', 10, now());
