var relPath = url('path').replace('index.html','');

// Loads initial URL state from lib, then returns the saved state
function getParamHash() {
  var paramHash = {}
  for (var key in url("#")) {
    var keySplit = key.split('|');
    var key = keySplit[0];
    var val = keySplit[1];
    console.log(`parsing param ${key}, found key ${key} and decoded val is ${val}`);

    var values = paramHash[key];
    if (!values) {
      values = [val];
    } else if (!values.includes(val)) {
      values.push(val);
    }
    paramHash[key] = values;
  }
  return paramHash;
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
    $.each(filteredActivities, function (activityIdx, activity) {
      activityHTML(activity).appendTo("#activities");
    });
  });
}