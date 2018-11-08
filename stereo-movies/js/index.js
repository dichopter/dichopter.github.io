document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  var movieList;
  getMovies();
});

function getMovies() {
  var requestURL = 'https://dichopter.github.io/stereo-movies/js/movieLinks.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    movieList = request.response;
    addVideos(movieList);
  }
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addVideos (movieList) { 
  console.log("Movie List:");
  console.log(movieList);
  var numRows = Math.ceil(movieList.length/3);
  console.log("Num rows: "+numRows);
  var container = document.querySelector(".stereograms");
  for(var i=1; i<=numRows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for(var j=1; j<=3; j++) {
      if(movieList.length==0) break;
      var col = document.createElement("div"); 
      col.classList+=" col s12 m6 l4";
      var iframe = document.createElement("iframe");
      iframe.src = movieList.pop();
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "encrypted-media");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("style", "width: 100%");
      col.appendChild(iframe);
      row.appendChild(col);
    }
    container.appendChild(row);
  } 
}
