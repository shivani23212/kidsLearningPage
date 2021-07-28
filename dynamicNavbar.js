function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
    x.className += " responsive";
    } else {
    x.className = "topnav";
    }
}

/* stops vertical navbar from reappearing after window width increased without clicking off the navbar
then width decreased */
window.addEventListener("resize", function(event) {
    let width = document.documentElement.clientWidth;
    let topNav = document.getElementById("myTopnav");
    if (width > 800 && topNav.className === "topnav responsive") {
        topNav.className = "topnav";
    }
}, true);