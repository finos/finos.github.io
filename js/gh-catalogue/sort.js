function sortActivities(activities) {
  var sortValue = "hotness-up";
  $(`li#sort > span > div > ul > li.active`).each(function(i) {
    sortValue = toValue($(this).text(),'sort');
  });
  var sort_by = sortValue.split('-')[0];
  var direction = (sortValue.split('-')[1] == "up") ? 1 : -1;

  if (sort_by == "hotness") {
    activities.sort(function (a, b) {
      var ret = 0;
      if (!a.cumulativeGitHubStats && !b.cumulativeGitHubStats) {
        ret = 0;
      } else if (!b || !b.cumulativeGitHubStats) {
        ret = direction;
      } else if (!a || !a.cumulativeGitHubStats) {
        ret = -1*direction;
      } else {
        ret = (a.cumulativeGitHubStats.heat - b.cumulativeGitHubStats.heat)*direction;
      }
      return ret;
    });
  } else if (sort_by == "name") {
    activities.sort(function (a, b) {
      if (a.activityName.toLowerCase() < b.activityName.toLowerCase()) return -1*direction;
      if (b.activityName.toLowerCase() < a.activityName.toLowerCase()) return 1*direction;
      return 0;
    });
  }
}
