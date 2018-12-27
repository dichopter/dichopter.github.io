

document.addEventListener('DOMContentLoaded', function() {
    
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    
    var images = document.querySelectorAll("img"); 
    images.forEach(function(image) {
      image.parentElement.addEventListener("click", function() {
        setCookie("imageNum",image.getAttribute("imageNum"),1);
      });
    });
    
  });
  
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  