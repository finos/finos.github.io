var webdriver = require('selenium-webdriver'), driver;
var By = webdriver.By;
var assert = require('assert');

var driver = new webdriver.Builder().forBrowser("chrome").build();
 
driver.get('http://localhost:8080/?sort=hotness-down');

driver.get('http://localhost:8080/?sort=hotness-down').then(function () {
	console.log("title is " + driver.getTitle());
   	return driver.getTitle();
});

// driver.getTitle().then(function(title) {
//   console.log("title is " + title);
//   assert(title.toLowerCase().indexOf("selenium test page")!==1);
// });

// driver.findElement(By.id('activity-recap'))
//   .getText().then(textValue => {
//     console.log("recap is " + textValue);
//     assert.equal('(all)', textValue);
//   });
 
driver.quit();