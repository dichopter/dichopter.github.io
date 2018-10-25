document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  var numImages = 20;
  getMovies();
  
});

function getMovies() {
  var requestURL = 'https://dichopter.github.io/stereo-movies/js/movieLinks.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var movieList = request.response;
    console.log(movieList);
    addVideos(20);
  }
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addVideos (numImages) { 
  var numRows = Math.ceil(numImages/3);
  var container = document.querySelector(".stereograms");
  
  for(var i=0; i<numRows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    var imageNum = 0;
    while(numImages>0&&imageNum<3){
      var col = document.createElement("div"); 
      col.classList+=" col s12 m6 l4";

      var a = document.createElement("a");
      a.href = "https://dichopter.github.io/stereogram";
      a.setAttribute("imageNum", numImages);
      col.appendChild(a);
      var img = document.createElement("img");
      img.src = "https://dichopter.github.io/stereogram/images/image"+numImages+".jpg";
      //http://dichopter.epizy.com/stereogram/images/image9.jpg
      a.appendChild(img);  
      row.appendChild(col);
      numImages--;
      imageNum++;
    }
    container.appendChild(row);
  } 
}
