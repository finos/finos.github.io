// ==================
// HTML functions
// ==================

function activityHTML(activity) {
  // Render lifecycle badge
  // console.log(`Rendering ${activity['name']}`);
  var state_class = `${activity['state'].toLowerCase()}-activity-state`;
  var type_class = `${activity['type'].toLowerCase()}-activity-type`;
  var $article = $("<article>").attr("class","white-panel "+type_class+" "+state_class).append(
    $("<h4>").append(activity['activityName'])).append($("<h5>").append(`[ ${activity['programShortName']} Program ]`)).append(
    $("<img>").attr("class","activity-state-badge").attr("src",`https://cdn.rawgit.com/symphonyoss/contrib-toolbox/master/images/ssf-badge-${activity['state'].toLowerCase()}.svg`));

  var $badges = $("<div>").attr('class','icon-container ghstats-container');
  stats = activity['cumulativeGitHubStats']
  if (stats) {
    badgeHTML("forks",stats['forks']).appendTo($badges);
    badgeHTML("watchers",stats['watchers']).appendTo($badges);
    badgeHTML("stars",stats['stars']).appendTo($badges);
    badgeHTML("collaborators",stats['collaborators']).appendTo($badges);
    $badges.appendTo($article);
  }

  // Render languages
  var $langs = $("<div>").attr('class','icon-container langs-container');
  var count = 1;
  if (stats && stats['languages']) {
    for (lang in stats['languages']) {
      count++;
      langHTML(toLabel(lang,'languages')).appendTo($langs);
      if (count == 6) break;
    };
    $langs.appendTo($article);
  }

  // TODO - show a activity description, when available in activities.json
  // $("<p>").text(repoDescription(activity['description'])).appendTo($article);
  $.each(activity['gitHubRepos'], function (i, repo) {
    $("<p>").append(
      $("<a>").attr("href", repoUrl(repo)).text(
        repo['name']).attr("class","repo-link")).appendTo($article).attr("class","line-separation");
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

function langHTML(value) {
  var url = `assets/langs/${value.toLowerCase()}.png`;
  return $("<img>").attr("class",'lang-icons').attr("src",url).attr("title", value);
}

// ==================
// Filters functions
// ==================

function filtersHTML(activities) {
  for (filterName in config['filters']) {
    $.each(activities, function (i, activity) {
      var repoValue = activity[filterName]
      if (activity['cumulativeGitHubStats'] && activity['cumulativeGitHubStats'][filterName]) {
        repoValue = activity['cumulativeGitHubStats'][filterName]
      }
      if (repoValue) {
        filterItemsHTML(filterName,repoValue);
      }
    });
    // Using Bootstrap multi-select, see index.html for import
    $(`select#${filterName}`).multiselect({
      maxHeight: 200,
      buttonWidth: '100px',
      nonSelectedText: 'None',
      onChange: function(option, checked, select) {
        renderCatalogue(false);
      }
    });
    $(`select#${filterName}`).multiselect('select', getParamHash()[filterName]);
  }

  $("li").each(function() {
    var idField = this.attributes['id'];
    if (idField) {
      var id = idField.value;
      $("li#"+id+" input").each(function() {
        var value = this.attributes['value'].value;
        this.setAttribute('name',id);
        this.setAttribute('id',id);
      });
    }
  });
}

function filterHTML(id) {
  var $name = $("<span>").text(toLabel(id,id)).attr("class","filter-label");
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

function filterItemsHTML(filterName, filterValue) {
  var keys = [];
  if (filterName === "languages") {
    for (var lang in filterValue) {
      keys.push(toLabel(lang));
    }
  } else {
    keys.push(filterValue);
  }

  var $select = $("select#"+filterName);
  if (!$select.length) {
    $select = filterHTML(filterName);
    $select.appendTo("ul.activities-filter-container");
  }
  
  keys.forEach (function (key) {
    var $option = $("option#"+key);
    if (!$option.length) {
      var label = toLabel(key, filterName);
      filterItemHTML(key,label).appendTo("select#"+filterName);
    }
  });
}

function filterItemHTML(id,value) {
  // console.log(`adding filter ${id} with value ${value}`)
  return $("<option>").attr("name",id).attr("id",id).attr("value",id).text(value);
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
        return `${toLabel($(options).val(),'sort')} `;
      }
    }
  }).appendTo("ul.sorts-container");
  $(`select#sort`).multiselect('deselect','hotness-up');
  $(`select#sort`).multiselect('select', getParamHash()['sort']);
}