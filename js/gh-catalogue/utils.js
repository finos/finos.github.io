// ==================
// Main functions
// ==================

function toLabel(value,filterName) {
  if (filterName === 'sort') {
    return config['sort']['valueLabels'][value];
  } else if (filterName && filterName == value) {
    return config['filters'][filterName]['label'];
  } else if (filterName && config['filters'][filterName]['valueLabels']) {
    return config['filters'][filterName]['valueLabels'][value];
  } else {
    return value.replace('#','-sharp').replace('+','-plus').trim();
  }
}

function toValue(label, filterName) {
  label = label.trim();
  if (filterName === 'sort') {
    for (labelKey in config['sort']['valueLabels']) {
      if (config['sort']['valueLabels'][labelKey] == label.trim()) {
        return labelKey;
      }
    }    
  } else if (filterName && config['filters'][filterName]['valueLabels']) {
    for (labelKey in config['filters'][filterName]['valueLabels']) {
      if (config['filters'][filterName]['valueLabels'][labelKey] == label) {
        return labelKey;
      }
    }
  }
  return label.replace('-sharp','#').replace('-plus','+').trim();
}

function getParamQuery() {
  var paramQuery = "#";
  for (filterName in config['filters']) {
    $(`li#${filterName} > span > div > ul > li.active`).each(function(i) {
      var filterValue = toValue($(this).text(),filterName);
      paramQuery += `${filterName}|${filterValue}&`;
    });
  }
  $(`li#sort > span > div > ul > li.active`).each(function(i) {
    var filterValue = toValue($(this).text(),'sort');
    paramQuery += `sort|${filterValue}`;
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
  return getConfigField(repo,'docs-link') || `https://github.com/symphonyoss/${repo['repositoryName']}`;
}