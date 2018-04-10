function filterActivities(activities) {
  // Filter only if there are some filter values defined
  var filteredActivities = activities;
  if (getParamQuery() != '#') {
    filteredActivities = activities.filter(function(activity) {
      // Invoke filters.js - filter activities based on filter values
      return filterActivity(activity);
    });
  }

  // Reset page
  $("#activities").empty();
  $("#deeplink").attr("href",`/${getParamQuery()}`);
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
    if (activity['cumulativeGitHubStats'] && activity['cumulativeGitHubStats'][filterName]) {
      repoValue = activity['cumulativeGitHubStats'][filterName]
    }
    var itemRet = false;
    var filterRet = $(`li#${filterName} > span > div > ul > li.active`).length == 0;
    $(`li#${filterName} > span > div > ul > li.active`).each(function(i) {
      var filterValue = toValue($(this).text(),filterName);
      if (jQuery.type(repoValue) === "string" && toValue(repoValue,filterName) == filterValue) {
        itemRet = true;
        // console.log(`1. It's a match for ${filterName}=${filterValue}`);
      } else {
          // This is a multi-value filter, like the languages field
          for (key in repoValue) {
            if (key == toValue(filterValue)) {
                itemRet = true;
                // console.log(`2. It's a match for ${filterName}=${filterValue}`);
            }
          }
      }
    });
    if (!itemRet && !filterRet) ret = false;
  }
  // console.log(`3. return ${ret} for ${activity['name']}`);
  return ret;
}