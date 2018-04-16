var NR_COLUMNS = 4
var relPath = url('path').replace('index.html','');

// Loads initial URL state from lib, then returns the saved state
function getParamHash() {
  var paramHash = {}
  for (var key in url("#")) {
    var keySplit = key.split('|');
    var key = keySplit[0];
    var val = keySplit[1];
    // console.log(`parsing param ${key}, found key ${key} and decoded val is ${val}`);

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
  // console.log("URL hash: "+url("#"));
  // console.log("paramHash: ");
  // console.log(getParamHash());
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
    var $row = $("<div>").attr("class","row");
    $.each(filteredActivities, function (activityIdx, activity) {
      activityHTML(activity,NR_COLUMNS).appendTo($row);
      console.log(NR_COLUMNS);
      console.log(activityIdx+1);
      var mod = (activityIdx+1) % NR_COLUMNS;
      console.log(mod);
      console.log("------------");
      if (mod == 0) {
        $row = $("<div>").attr("class","row");
        $row.appendTo("#activities");
      }
    });
  });
}