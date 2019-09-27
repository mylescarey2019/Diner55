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



  // $("#submit").on("click", function(event) {
  //   event.preventDefault();

  //   // validate form entries and
  //   // create the match user's student profile and then
  //   // call post api route to add them to the database and receive match results 
  //   const matchUser = {name: '', photo: '', answers: []};
  //   var missingAnswers = false;
  //   console.log($("#user-name").val());
  //   console.log($("#photo-path").val());
  //   if ($("#user-name").val() === '') {
  //     missingAnswers = true;
  //     console.log("name-undef");
  //     $("#user-name").addClass('no-answer');
  //   } else {
  //     matchUser.name = $("#user-name").val();
  //   };

  //   // set photo
  //   if ($("#photo-path").val() === '') {
  //     matchUser.photo = $("#photo-path").attr("placeholder");
  //   } else {
  //     matchUser.photo = $("#photo-path").val();
  //   };

  //   // evaluate the survey question answers
  //   var i = 1;
  //   $(".question").each(function () {
  //     console.log(`question ${i} ${$(this).val()}`);
  //     if ($(this).val() === '') {
  //       console.log('UNDEF');
  //       missingAnswers = true;
  //       $(this).addClass('no-answer');
  //     } else {
  //       console.log('NOT UNDEF')
  //       matchUser.answers[i - 1] = $(this).val();
  //     };
  //     i++
  //   });

  //   console.log(`THE USER IS: ${JSON.stringify(matchUser)}`);

  //   if (missingAnswers) {
  //     $('#my-modal').modal('show');
  //     return;
  //   };

  //   // make insert post

  // });


  // retreive servers for the order form control select box
  $.ajax("/api/foodservers", {
    type: "GET"
  }).then(function(res) {
      console.log(res);
      console.log(res[0].food_server_id, res[0].food_server_name);
      $("#server-ctl").append('<option value="" selected="selected" hidden="hidden"  >Select server</option>');
      res.map(foodserver => {
        $("#server-ctl").append(`<option value"${foodserver.food_server_id}">${foodserver.food_server_name}</option`);
      });
    }
  );

});