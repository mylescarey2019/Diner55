-- insert server
INSERT INTO food_server (food_server_name)
VALUES('Logan'),
      ('Ella'),
      ('Nathan'),
      ('Brittney'),
      ('Zach'),
      ('Sara'),
      ('Leah');
      
-- insert food orders
INSERT INTO food_order (food_server_id,food_order_name)
VALUES (1,"BLT"),
       (1,"Turkey Club"),
       (2,"Calzone"),
       (4,"Tomato Soup"),
       (4,"Roast Beef with fries"),
       (5,"Cheesburger no onions");
