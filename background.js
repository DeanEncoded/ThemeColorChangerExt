'use strict';

chrome.runtime.onInstalled.addListener(function () {
  /*chrome.storage.sync.set({'color': '#3aa757'}, function() {
    console.log("The color is green.");
  });*/
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

    // change the color-theme of the tab I guess?
    console.log(tabId)

    var url = new URL(tab.url)
    var colorname = "color_" + url.hostname

    // execute the file that checks for the theme-color meta tag.
    chrome.tabs.executeScript(
      tab.id,
      { file: 'checkmeta.js' },
      function () {
        // change the theme color
        chrome.storage.sync.get(colorname, function (result) {
          if (result[colorname] != null) {
            console.log('scoopy-whoop')
            chrome.tabs.executeScript(
              tab.id,
              { code: 'document.querySelector("meta[name=theme-color]").setAttribute("content","' + result[colorname] + '");' }
            );
          }
        });
      }
    );



  }
})