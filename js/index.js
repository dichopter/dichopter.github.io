// <Adding a service worker>




if('serviceWorker' in navigator) { // Check if supported...
  // Register service worker...
  window.addEventListener('load', ()=> {
    navigator.serviceWorker
    .register("../sworker.js")
    .then(reg=>console.log("Service worker registered in page..."))
    .catch(err=>console.log(err));
  });
  
}





// </Adding a service worker>


document.addEventListener('DOMContentLoaded', function() {
  //sessionStorage.imageNum = "1";
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

