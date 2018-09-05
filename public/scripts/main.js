document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
  //Call Modal Manager to manage modals on results page
  modalManager();
});

// Allows specific Modal to be loaded to page on click of specific info. icon.
// modalCloser is also called which adds event listener to specific components of the modal so that clicking said element results in modal closing
function modalManager() {
  $(".icon").on("click", function() {
    if ($(this).attr("id") === "taxes-info") {
      modalOpener("#taxes-info-modal");
      modalCloser("#taxes-info-modal");
    } else if ($(this).attr("id") === "expenses-info") {
      modalOpener("#expenses-info-modal");
      modalCloser("#expenses-info-modal");
    } else if ($(this).attr("id") === "fuel-info") {
      modalOpener("#fuel-info-modal");
      modalCloser("#fuel-info-modal");
    }
  });
}

// Adds the class that allows the modal to load to page
function modalOpener(ID) {
  $(ID).addClass("is-active");
}

// Removes the modal from the page by removing the is-active class
function modalCloser(ID) {
  $(ID + " .modal-background").on("click", function() {
    $(ID).removeClass("is-active");
  });
  $(ID + " .modal-card .modal-card-head .delete").on("click", function() {
    $(ID).removeClass("is-active");
  });
}

// Alert users on smaller screensize to rotate phone in case graphs on historical gas prices not displayed.
function screenResize() {
  let w = parseInt(window.innerWidth);
  if (w <= 569) {
    //max-width 569px
    swal("Try rotating device if graphs are not displayed properly");
  }
}

// Acts as a toggle  to return totals spent on fuel on a yearly and monthly time periods to page
$("#monthly-yearly-toggle").on("click", function() {
  $(".fuelcosts").toggleClass("hidden");
  if ($(this).text() === "Monthly") {
    $(this).text("Yearly");
  } else if ($(this).text() === "Yearly") {
    $(this).text("Monthly");
  }
});
