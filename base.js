// <Register service worker>
if('serviceWorker' in navigator) { // Check if supported...
    window.addEventListener('load', ()=> {
      navigator.serviceWorker
      .register("https://dichopter.github.io/sworkerFull.js")
      .then(reg=>console.log("Service worker registered in page..."))
      .catch(err=>console.log(err));
    });
    
  }
// </Register service worker>
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    var dropdowns = document.querySelectorAll('.dropdown-trigger')
    for (var i = 0; i < dropdowns.length; i++){
      M.Dropdown.init(dropdowns[i]);
    }
    var collapsibles = document.querySelectorAll('.collapsible')
    for (var i = 0; i < collapsibles.length; i++){
      M.Collapsible.init(collapsibles[i]);
    }

  });
  
  