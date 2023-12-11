INSERT INTO users 
(email, firstname, lastname, street, streetnr, zip, birthday, phone, password) VALUES
("admin@csbe.ch","admin","admin","Zieglerstrasse",64,"3007","2000-01-01","079 420 42 69","admin");

INSERT INTO roles
(user, name) VALUES
((SELECT id FROM users WHERE email="admin@csbe.ch"), "Admin");