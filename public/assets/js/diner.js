// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $(".order-pickup").on("click", function(event) {
    var id = $(this).data("id");
    var newIsServed = $(this).data("newserve");
    console.log("In Pick Up Ready Click");
    console.log($(this).data("newserve"));

    var newServedState = {
      is_served: newIsServed
    };

    // Send the PUT request.
    $.ajax("/api/foodorder/" + id, {
      type: "PUT",
      data: newServedState
    }).then(
      function() {
        console.log("changed served to", newServedState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".order-delete").on("click", function(event) {
    var id = $(this).data("id");
    var newIsServed = $(this).data("newserve");
    console.log("In Close Out Order Clock");
    console.log(`Order Id Is: ${id}`);

    var newServedState = {
      is_served: newIsServed
    };

    // Send the DELETE request.
    $.ajax("/api/foodorder/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("changed served to", newServedState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



  $("#submit").on("click", function(event) {
    event.preventDefault();

    //remove missing answer warning color if form select made
    $("#order,#server-selection").change(function() {
      $(this).removeClass("no-answer");
    });

    // validate form entries and
    // call post api route to add order to the database
    var missingAnswers = false;
    console.log(`order-text ${$("#order").val()}`);
    console.log(`server-id ${$("#server-selection").val()}`);
    var orderText = $("#order").val();
    var serverId =  $("#server-selection").val();

    if (orderText === '') {
      missingAnswers = true;
      console.log("order-undef");
      $("#order").addClass('no-answer');
    };

    // validate server selection
    if (serverId === '') {
      console.log('server-undef');
      missingAnswers = true;
      $("#server-selection").addClass('no-answer');
    };

    if (missingAnswers) {
      $('#my-modal').modal('show');
      return;
    };
 
    var newOrder = { serverId : serverId,
                     orderText : orderText };

    // make insert post
    $.ajax("/api/foodorder/", {
      type: "POST",
      data: newOrder
    }).then(
      function() {
        console.log("Adding order", newOrder);
        // Reload the page to get the updated list
        location.reload();
      }
    );

  });


  // retreive servers for the order form control select box
  $.ajax("/api/foodservers", {
    type: "GET"
  }).then(function(res) {
      console.log(res);
      console.log(res[0].food_server_id, res[0].food_server_name);
      $("#server-selection").append('<option value="" selected="selected" hidden="hidden"  >Select server</option>');
      res.map(foodserver => {
        $("#server-selection").append(`<option value="${foodserver.food_server_id}">${foodserver.food_server_name}</option`);
      });
    }
  );

});