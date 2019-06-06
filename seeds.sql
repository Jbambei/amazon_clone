CREATE DATABASE IF NOT EXISTS amazon_db;

USE amazon_db;

CREATE TABLE products(
product_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, 
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(6,2) NOT NULL,
stock_quantity INTEGER(4) NOT NULL
);


-- 10 Seed values for testing --

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Happiness', 'Moods', 50.99, 6),
	('Melancholy', 'Moods', 1.00, 1000),
    ('Anger', 'Moods', 5.00, 999),
    ('Spite', 'Moods', 6.00, 500),
    ('Bronze Battleaxe', 'Weapons', 249.99, 2),
    ('Ancient Staff', 'Weapons', 500.00, 9950),
    ('Blowpipe', 'Weapons', 450.00, 5),
    ('Rubber Chicken', 'Joke Items', 5.00, 1),
    ('Balloon', 'Joke Items', 0.99, 100),
    ('Fake Blood', 'Joke Items', 3.99, 800);