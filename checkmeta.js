// we check to see if a meta tag with name "theme-color" exists.
// if it doesn't... we make the tag ourselves

if (document.querySelector("meta[name=theme-color]") == null) {
    var meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#000000";
    document.getElementsByTagName("head")[0].appendChild(meta)
}
