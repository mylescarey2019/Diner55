// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $(".order-pickup, .order-delete").on("click", function(event) {
    var id = $(this).data("id");
    var newIsServed = $(this).data("newserve");
    console.log("IN CLICK");
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

});