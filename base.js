// <Register service worker>
if('serviceWorker' in navigator) { // Check if supported...
    window.addEventListener('load', ()=> {
      navigator.serviceWorker
      .register("../sworkerFull.js")
      .then(reg=>console.log("Service worker registered in page..."))
      .catch(err=>console.log(err));
    });
    
  }
// </Register service worker>
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });
  
  