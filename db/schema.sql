DROP DATABASE IF EXISTS diner;
CREATE DATABASE diner;

USE diner;

CREATE TABLE food_order (
  food_order_id INT NOT NULL AUTO_INCREMENT,
  food_server_id INTEGER NOT NULL,
  food_order_name  VARCHAR(200) NOT NULL,
  is_served BOOLEAN DEFAULT FALSE,
  PRIMARY KEY(food_order_id)
);


CREATE TABLE food_server (
  food_server_id INT NOT NULL AUTO_INCREMENT,
  food_server_name VARCHAR(50) NOT NULL,
  PRIMARY KEY(food_server_id)
);

ALTER TABLE food_order
ADD CONSTRAINT FK_food_order_food_server
FOREIGN KEY (food_server_id) REFERENCES food_server(food_server_id);
