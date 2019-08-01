-- Drops the bamazon if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Make it so all of the following code will affect bamazon --

-- Creates the table "products" within bamazon --
USE bamazon;
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name  VARCHAR(50) NOT NULL,
department_name  VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
  );

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product1", "dept2",5,10);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product2", "dept2",1,100);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product3", "dept2",20,500);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product4", "dept1",50,1000);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product5", "dept1",.5,10000);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product6", "dept5",1,500);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product7", "dept5",8,650);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product8", "dept5",5.5,300);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product9", "dept4",9.1,10);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("product10", "dept1",1.5,250);

 select *from products;

