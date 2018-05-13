function filterActivities(activities) {
  // Filter only if there are some filter values defined
  var filteredActivities = activities;
  if (getParamQuery() != '/?') {
    filteredActivities = activities.filter(function(activity) {
      // Invoke filters.js - filter activities based on filter values
      return filterActivity(activity);
    });
  }

  // Reset page
  $("#activities").empty();

  var url = new URL(window.location.href);
  var embed = url.searchParams.get("embed");
  var newHref = window.location.pathname;
  if (embed) {
    newHref += '?embed=true';
  }
  newHref = newHref + getParamQuery();
  currentHref = decodeURI(window.location.href.split(window.location.host)[1]);

  if (currentHref != newHref) {
    history.pushState(null, "FINOS Catalogue", newHref);
  }

  if (activities.length == filteredActivities.length) {
    $("#activity-recap").text(`${activities.length} (all) activities shown`);
  } else {
    $("#activity-recap").text(`${filteredActivities.length}/${activities.length} activities shown`);
  }
  return filteredActivities;
}

// Return true if at least one of the repos matches
function filterActivity(activity) {
  var ret = true;
  for (filterName in config['filters']) {
    var repoValue = activity[filterName];

    var itemRet = false;
    var filterRet = $(`li#${filterName} > span > div > ul > li.active`).length == 0;
    $(`li#${filterName} > span > div > ul > li.active`).each(function(i) {
      var filterValue = toValue($(`a > label > input`,this).attr('value'),filterName);
      if (jQuery.type(repoValue) === "string" && toValue(repoValue,filterName) == filterValue) {
        itemRet = true;
      } else if (filterName == 'tags') {
          $.each(repoValue, function(index, key) {
            if (key == toValue(filterValue)) {
                itemRet = true;
            }
          });
      } else {
          // This is a generic multi-value filter, like the languages field
          for (key in repoValue) {
            if (key == toValue(filterValue)) {
                itemRet = true;
            }
          }
      }
    });
    if (!itemRet && !filterRet) ret = false;
  }
  return ret;
}