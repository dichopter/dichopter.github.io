document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  var numImages = 20;
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
  // <iframe width="971" height="546" src="https://www.youtube.com/embed/dQGhflN6Ob0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  for(var i=0; i<numRows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    console.log(movieList.length);
    for(var j=1; j<=3; j++) {
      if((i*j)>movieList.length) break;
      console.log(`(${i}*${j}):${(i*j)}`);

      var col = document.createElement("div"); 
      col.classList+=" col s12 m6 l4";
      var iframe = document.createElement("iframe");
      iframe.src = movieList[(i*j)];
      console.log(`movieList[${(i*j)}]: ${movieList[(i*j)]}`);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "encrypted-media");
      iframe.setAttribute("allowfullscreen", "true");
      col.appendChild(iframe);
      row.appendChild(col);
    }
    container.appendChild(row);
  } 
}
