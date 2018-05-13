// ==================
// HTML functions
// ==================

function activityHTML(activity) {
  // Render lifecycle badge
  var state_class = `${activity['state'].toLowerCase()}-activity-state`;
  var type_class = `${activity['type'].toLowerCase()}-activity-type`;
  var $article = $("<div>").attr("class", "activity col-xs-6 col-md-4 col-lg-2 "+type_class+" "+state_class);
  var metricsLink = `https://metrics.finos.org/app/kibana?#/dashboard/C_ESCo_projects?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-2y,mode:quick,to:now))&_a=(filters:!(),query:(query_string:(analyze_wildcard:!t,query:'project:%22${activity['activityName']}%22')))`;

  $article.append($("<h4>").append(activity['activityName']));
  $article.append($("<h5>").append($("<a>").attr("href",activity['programHomePage']).attr("target","_blank").append(`${activity['programShortName']} Program`)));
  $article.append($("<h5 class='metrics-link'>").append($("<a>").attr('href',metricsLink).attr('target','_blank').append('Activity Metrics')));
  $article.append($("<a>").attr("href",toStateUrl(activity['state'])).attr("target","_blank").append($("<img>").attr("class","activity-state-badge").attr("src",`https://cdn.rawgit.com/finos/contrib-toolbox/master/images/badge-${activity['state'].toLowerCase()}.svg`)));

  var $badges = $("<div>").attr('class','icon-container ghstats-container');
  stats = activity['cumulativeGitHubStats']
  if (stats) {
    badgeHTML("forks",stats['forks']).appendTo($badges);
    badgeHTML("watchers",stats['watchers']).appendTo($badges);
    badgeHTML("stars",stats['stars']).appendTo($badges);
    badgeHTML("collaborators",stats['collaborators']).appendTo($badges);
    $badges.appendTo($article);
  }

  // Render tags
  var $tags = $("<div>").attr('class','tags-container');
  if (activity['tags']) {
    var tagList = activity['tags'];
    $.each(tagList, function (i, tag) {
      tagHTML(toLabel(tag,'tags')).appendTo($tags);
    });
    $tags.appendTo($article);
  }

  // Render languages
  var $langs = $("<div>").attr('class','icon-container langs-container');
  if (stats && stats['languages']) {
    var langsList = sortLangs(stats['languages']).slice(0, 6);
    $.each(langsList, function (i, lang) {
      langHTML(toLabel(lang[0],'languages') + ` - ${lang[1]} lines`,toKey(lang[0],'languages')).appendTo($langs);
    });
    $langs.appendTo($article);
  }

  $("<p class='line-separation'>").appendTo($article);
  var $repos = $("<div class='activity-repos'>").appendTo($article);
  $.each(activity['gitHubRepos'], function (i, repo) {
    $("<a>").attr("href", repo['gitHubURL']).attr("target", "_blank").text(
      repo['name']).attr("class","repo-link").appendTo($repos);
  });
  return $article;
}

function badgeHTML(type,value) {
  var url = `assets/gh-icons/${type.toLowerCase()}.png`;
  var $container = $("<div>").attr("class","badge");
  var $span = $("<span>").text(value);
  var $img = $("<img>").attr("title",type).attr("src",url);
  $container.append($img).append($span);
  return $container;
}

function langHTML(title,value) {
  var url = `assets/langs/${value.toLowerCase().replace(new RegExp("\\+", 'g'), 'plus')}.png`;
  return $("<img>").attr("class",'lang-icons').attr("src",url).attr("title", toLabel(title,'languages')).attr("alt", title);
}

function tagHTML(value) {
  return $("<span>").attr("class",'activity-tag').text('#'+value);
}

// ==================
// Filters functions
// ==================

function filtersHTML(activities) {
  for (filterName in config['filters']) {
    var filtersToAdd = {};
    $.each(activities, function (i, activity) {
      var repoValue = activity[filterName]
      if (activity['cumulativeGitHubStats'] && activity['cumulativeGitHubStats'][filterName]) {
        repoValue = activity['cumulativeGitHubStats'][filterName]
      }
      if (repoValue) {
        $.each(filterItemsHTML(filterName,repoValue, activity),function(i, filterItem) {
          filtersToAdd[filterItem] = true;
        });
      }
    });

    Object.keys(filtersToAdd).sort().forEach (function (item) {
      var itemSplit = item.split('|');
      filterItemHTML(itemSplit[1],itemSplit[0],itemSplit[2]).appendTo("select#"+filterName);
    });

    // Using Bootstrap multi-select, see index.html for import
    $(`select#${filterName}`).multiselect({
      maxHeight: 200,
      buttonWidth: '100px',
      nonSelectedText: 'All',
      onChange: function(option, checked, select) {
        renderCatalogue(false);
      }
    });
    $(`select#${filterName}`).multiselect('select', getParamHash()[filterName]);
  }
}

function filterHTML(id, activity) {
  var $name = $("<span>").text(toLabel(id,id, activity)).attr("class","filter-label");
  var $li = $("<li>").attr("class","drowdown").attr("id",id);
  var $select = $("<select>")
  .attr("style","visibility:hidden")
  .attr("id",id)
  .attr("multiple","multiple")
  .attr("role","button");
  $name.appendTo($li);
  $select.appendTo($li);
  return $li;
}

function filterItemsHTML(filterName, filterValue, activity) {
  var keys = [];
  if (filterName == 'languages') {
    for (var lang in filterValue) {
      var key = toKey(lang,filterName);
      keys.push(key);
    }
  } else if (filterName == 'tags') {
    $.each (filterValue, function (index,singleValue) {
      var key = toKey(singleValue,filterName);
      keys.push(key);
    });
  } else {
    keys.push(filterValue);
  }

  var $select = $("select#"+filterName);
  if (!$select.length) {
    $select = filterHTML(filterName, activity);
    $select.appendTo("ul.activities-filter-container");
  }

  var items = []
  keys.forEach (function (key) {
    var $option = $("option#"+toKey(key,filterName));
    if (!$option.length) {
      var label = toLabel(key, filterName, activity);
      items.push(label + "|" + key + "|" + filterName);
    }
  });
  return items;
}

function filterItemHTML(id,value, filterName) {
  return $("<option>").attr("name",id).attr("id",id).attr("value",id).text(toLabel(value,filterName,null));
}

// ==================
// Sort functions
// ==================

function sortsHTML(activities) {
  // Using Bootstrap multi-select, see index.html for import
  $("select#sort").multiselect({
    buttonWidth: '100px',
    onChange: function(option, checked, select) {
      renderCatalogue(false);
    },
    buttonText: function(options, select) {
      if (options.length === 0) {
        return 'Sort';
      } else {
        return toLabel($(options).val(),'sort');
      }
    }
  }).appendTo("ul.sorts-container");
  $(`select#sort`).multiselect('deselect','hotness-up');
  $(`select#sort`).multiselect('select', getParamHash()['sort']);
}