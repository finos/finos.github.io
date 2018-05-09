var NR_COLUMNS = 6;
var relPath = url('path').replace('index.html','');

// Loads initial URL state from lib, then returns the saved state
function getParamHash() {
  var paramHash = {}
  var queryString = window.location.href.split('/#/?')[1];
  queryString.split('&').forEach(function (filterItem) {
    var filterName = filterItem.split('=')[0];
    var filterValue = filterItem.split('=')[1];
    var values = paramHash[filterName];
    if (!values) {
      values = [filterValue];
    } else if (!values.includes(filterValue)) {
      values.push(filterValue);
    }
    paramHash[filterName] = values;
  });
  return paramHash;
}

function renderScreen() {
  var url = new URL(window.location.href);
  var embed = url.searchParams.get("embed");
  if (embed == 'true') {
    $("#navbar").hide();
    $("#sidebar").hide();
    $("#activity-recap").hide();
  }
}

function renderCatalogue(firstRun) {
  $.get("activities.json", function (activities) {
    if (firstRun) {
      // Invoke html-render.js
      filtersHTML(activities['activities']);
      sortsHTML(activities['activities']);
    }

    // Invoke filters.js
    var filteredActivities = filterActivities(activities['activities']);

    // Invoke sort.js
    sortActivities(filteredActivities);

    // Invoke html-render.js - render out activities
    var $row = $("<div>").attr("class", "row");
    $.each(filteredActivities, function (activityIdx, activity) {
      activityHTML(activity,NR_COLUMNS).appendTo($row);
    });
    $row.appendTo("#activities");
  });
}