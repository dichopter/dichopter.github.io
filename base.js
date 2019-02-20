// <Register service worker>
if ('serviceWorker' in navigator) { // Check if supported...
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register("https://dichopter.github.io/sworkerFull.js")
      .then(reg => console.log("Service worker registered in page..."))
      .catch(err => console.log(err));
  });

}
// </Register service worker>



document.addEventListener('DOMContentLoaded', function () {
  // Render the navbar through here
  httpGetAsync("https://dichopter.github.io/navbar.html", renderItems);

});



function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}

function renderItems(res) {
  console.log(res);
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  var dropdowns = document.querySelectorAll('.dropdown-trigger')
  for (var i = 0; i < dropdowns.length; i++) {
    M.Dropdown.init(dropdowns[i], {
      alignment: "right",
      // hover: true, MAYBE ADD IN FUTURE 
      constrainWidth: false,
      coverTrigger: false
    });
  }
  var collapsibles = document.querySelectorAll('.collapsible')
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i]);
  }
}