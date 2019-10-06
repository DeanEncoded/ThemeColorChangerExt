let changeColor = document.getElementById('changeColor');
let color = document.getElementById('color');


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // get the domain of the currentab. Then gets its color
    var tab = tabs[0];
    var url = new URL(tab.url)
    var colorname = "color_" + url.hostname

    chrome.storage.sync.get(colorname, function (result) {
        if (result[colorname] != null) {
            changeColor.style.backgroundColor = result[colorname]
            color.setAttribute("value", "994883"); 
        }
    });

});

changeColor.onclick = function (element) {
    // change only the color of the current site. Don't use a universal color, obviously.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // get the domain of the currentab
        var tab = tabs[0];
        var url = new URL(tab.url)
        var colorname = "color_" + url.hostname

        var colorString = '#' + color.value

        // execute the file that checks for the theme-color meta tag.
        chrome.tabs.executeScript(
            tab.id,
            { file: 'checkmeta.js' },
            function () {
                // change the theme color
                chrome.tabs.executeScript(
                    tab.id,
                    { code: 'document.querySelector("meta[name=theme-color]").setAttribute("content","' + colorString + '");' }
                );
            }
        );

        // set the theme color in storage.
        var args = {};
        args[colorname] = colorString
        chrome.storage.sync.set(args, function () {
            console.log("Color for domain changed");
        });
    });

}
