document.addEventListener('DOMContentLoaded', function() {
  //sessionStorage.imageNum = "1";
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  var numImages = 20;
  addImages(numImages);
  var images = document.querySelectorAll(".stereograms .row a"); 
  images.forEach(function(image) {
    image.addEventListener("click", function() {
      document.cookie = "imageNum="+image.getAttribute("imageNum");
    });
  });
  
});


function addImages (numImages) { 
  var numRows = Math.ceil(numImages/3);
  var container = document.querySelector(".stereograms");
  
  for(var i=0; i<numRows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    var imageNum = 0;
    while(numImages>0&&imageNum<3){
      var col = document.createElement("div"); 
      col.classList+=" col s12 m4";
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
