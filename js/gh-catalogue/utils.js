// ==================
// Main functions
// ==================

function sortLangs(langs) {
  var sortable=[];
  for(var key in langs) {
    if(langs.hasOwnProperty(key)) {
      sortable.push([key, langs[key]]);
    }
  }
  sortable.sort(function(a, b) {
    return b[1]-a[1];
  });
  return sortable;
}

function toStateUrl(state) {
  return config['states'][state];
}

function toLabel(key,filterName, activity) {
  var labelField;

  if (filterName && config['filters'][filterName] && config['filters'][filterName]['valueKeys'] && config['filters'][filterName]['valueKeys'][key]) {
    key = toKey(key, filterName);
  }
  var ret = key;

  if (config['filters'][filterName] && config['filters'][filterName]['labelField']) {
    labelField = config['filters'][filterName]['labelField'];
  }

  if (filterName === 'sort') {
    ret = config['sort']['valueLabels'][key];
  } else if (filterName && filterName == key) {
    ret = config['filters'][filterName]['label'];
  } else if (labelField && activity && activity[labelField]) {
    ret = activity[labelField];
  } else if (filterName && config['filters'][filterName]['valueLabels'] && config['filters'][filterName]['valueLabels'][key]) {
    ret = config['filters'][filterName]['valueLabels'][key];
  }
  return ret;
}

function toKey(value, filterName) {
  if (filterName && config['filters'][filterName]['valueKeys']) {
    for (keyLabel in config['filters'][filterName]['valueKeys']) {
      if (config['filters'][filterName]['valueKeys'][keyLabel] == value) {
        return keyLabel;
      }
    }
  }
  return value;
}

function toValue(label, filterName) {
  var ret = label.trim();
  if (filterName === 'sort') {
    for (labelKey in config['sort']['valueLabels']) {
      if (config['sort']['valueLabels'][labelKey] == label.trim()) {
        ret = labelKey;
      }
    }
  } else if (filterName && config['filters'][filterName]['valueLabels']) {
    for (labelKey in config['filters'][filterName]['valueLabels']) {
      if (config['filters'][filterName]['valueLabels'][labelKey] == label) {
        ret = labelKey;
      }
    }
  }
  if (filterName && config['filters'][filterName] && config['filters'][filterName]['valueKeys'] && config['filters'][filterName]['valueKeys'][ret]) {
    ret = config['filters'][filterName]['valueKeys'][ret];
  }
  return ret;
}

function getParamQuery() {
  var paramQuery = "?";
  for (filterName in config['filters']) {
    $(`li#${filterName} > span > div > ul > li.active`).each(function(i) {
      var filterValue = toValue($(this).text(),filterName);
      var value = $(`a > label > input`,this).attr('value');
      paramQuery += `${filterName}=${value}&`;
    });
  }
  $(`li#sort > span > div > ul > li.active`).each(function(i) {
    var filterValue = toValue($(this).text(),'sort');
    paramQuery += `sort=${filterValue}`;
  });
  return paramQuery;
}

// ==================
// Activities functions
// ==================

function getConfigField(repo,field) {
  if (config['repos'][repo.repositoryName] && config['repos'][repo.repositoryName][field]) {
    return config['repos'][repo.repositoryName][field];
  }
  return null;
}

function repoUrl(repo) {
  return getConfigField(repo,'docs-link') || `https://github.com/symphonyoss/${repo['name']}`;
}