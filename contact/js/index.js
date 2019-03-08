document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll("a.profile-image");
    images.forEach(function (image) {
        image.addEventListener("click", function () {
            setCookie("imageNum", image.getAttribute("imageNum"), 1);
        });
    });

});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}