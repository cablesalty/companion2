const navbarstyle = document.getElementById("navbarstyle");
const checkfreq = document.getElementById("checkfreq");

// localstorage
// let set_navbarstyle = localStorage.getItem("navbarstyle");
// if (set_navbarstyle == null) {
//     console.log("No value set for navbarstyle.");
//     set_navbarstyle = "fullwidth";
//     localStorage.setItem("navbarstyle", set_navbarstyle);
// }

// let set_checkfreq = localStorage.getItem("checkfreq");
// if (set_checkfreq == null) {
//     console.log("No value set for checkfreq.");
//     set_checkfreq = "1000";
//     localStorage.setItem("checkfreq", set_checkfreq);
// }

// console.log("set_navbarstyle",set_navbarstyle);
// console.log("set_checkfreq",set_checkfreq);

// Add eventListeners
navbarstyle.addEventListener("change", function() {
    console.log("navbarstyle opt changed, saving")
    localStorage.setItem("navbarstyle", navbarstyle.value);
    console.log(`Selected option: ${navbarstyle.value}`);
});

checkfreq.addEventListener("change", function() {
    console.log("checkfreq opt changed, saving")
    localStorage.setItem("checkfreq", checkfreq.value);
    console.log(`Selected option: ${checkfreq.value}`);
});

// Select saved option in UI
document.querySelector('#navbarstyle option[value="' + set_navbarstyle + '"]').selected = true;
document.querySelector('#checkfreq option[value="' + set_checkfreq + '"]').selected = true;