# Diner 55

## Full Stack website simulating Diner server to kitchen ordering - Utilizing MVC Architecture

## Test Cases

Functionality Cases

1. user adds an order but doesn't enter text nor selects server
   1. validation modal appears and missing fields should show highlighted until corrected
2. user adds an order
   1. database results
      1. food_order row is added to database with the correct foreign key id for the server that was selected in drop-down
   2. page results
      1. page reloads as orders are re-trieved from database - new order appears in upper section (kitchen) with button that say "Pick Up Ready"  - order will be by server name alphabetically
3. user moves order from kitchen to server by clicking "Pick Up Ready"
   1. database results
      1. the food_order row's is_server column is changed from false to true
   2. page results
      1. order moves from upper section (kitchen) to lower section (served)
4. user deletes an order from served section with button "Close Out Order"
   1. database results
      1. food_order row is deleted from database
   2. page results
      1. the food order is removed from the page