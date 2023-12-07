CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    streetnr int NOT NULL,
    zip VARCHAR(255) NOT NULL,
    birthday int NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    img BLOB,
    desk VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS parkings (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    img BLOB,
    desk VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL AUTO_INCREMENT,
    user int,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS room_reservations (
    id INT NOT NULL AUTO_INCREMENT,
    user INT,
    room INT,
    status VARCHAR(255) NOT NULL,
    reserved_from INT NOT NULL,
    reserved_to INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (room) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS parking_reservations (
    id INT NOT NULL AUTO_INCREMENT,
    user INT,
    parking INT,
    status VARCHAR(255) NOT NULL,
    reserved_from INT NOT NULL,
    reserved_to INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (parking) REFERENCES parkings(id)
);