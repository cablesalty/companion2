let ip = localStorage.getItem("ip") || "0.0.0.0";
let statuscheck;

let history = JSON.parse(localStorage.getItem("history")) || [];
let laststate;

console.log(history);
console.log(typeof history);

// load settings
let set_pageanim = localStorage.getItem("pageanim");
if (set_pageanim == null) {
    console.log("No value set for checkfreq.");
    set_pageanim = "enabled";
    localStorage.setItem("pageanim", set_pageanim);
}
if (set_pageanim == "enabled") {
    document.getElementById("bodytag").classList.add("anim_fadein");
}

let set_navbarstyle = localStorage.getItem("navbarstyle");
if (set_navbarstyle == null) {
    console.log("No value set for navbarstyle.");
    set_navbarstyle = "island";
    localStorage.setItem("navbarstyle", set_navbarstyle);
} else if (set_navbarstyle == "fullwidth") {
    const navbar = document.querySelector(".islandnavbar");
    navbar.classList.remove("islandnavbar");
    navbar.classList.add("navbar");
}

let set_checkfreq = localStorage.getItem("checkfreq");
if (set_checkfreq == null) {
    console.log("No value set for checkfreq.");
    set_checkfreq = "1000";
    localStorage.setItem("checkfreq", set_checkfreq);
}

if (document.location.href.endsWith("history.html")) {
    const historycontainer = document.getElementById("historycontainer");
    history.reverse().forEach(element => {
        historycontainer.innerHTML += '<div class="historyblock">' + element + '</div>'
    });
}

console.log("set_navbarstyle",set_navbarstyle);
console.log("set_checkfreq",set_checkfreq);
console.log("set_pageanim",set_pageanim);

async function getRequest(url) {
    try {
        let response = await fetch("http://" + ip + ":5000" + url);
        console.log("http://" + ip + ":5000" + url)
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.text();
    } catch (error) {
        // document.getElementById("statustitle").innerText = "Unknown state. (3)";
        // document.getElementById("statusdesc").innerText = "Request failed.";
        // document.getElementById("acceptmatchbtn").style.display = "none";
        // document.getElementById("lobby_card").style.backgroundColor = "#5f5f5f";
        return null;
    }
}

async function acceptmatch() {
    const status = await getRequest("/api/acceptmatch");
    if (status == "ok") {
        document.getElementById("statustitle").innerText = "Match accepted!";
        document.getElementById("statusdesc").innerText = "You have accepted the match.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#6bdb83";
    } else {
        document.getElementById("statustitle").innerText = "Failed to accept.";
        document.getElementById("statusdesc").innerText = "Could not accept match.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#6bdb83";
    }
}

async function action_stopserver() {
    clearInterval(statuscheck);
    const status = getRequest("/api/stop");
    
    if (document.location.href.endsWith("index.html")) {
        document.getElementById("mainmenuactions").style.display = "none";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "none";

        document.getElementById("statustitle").innerText = "Server stopped.";
        document.getElementById("statusdesc").innerText = "Relaunch the server on your computer, and restart the mobile app to start again.";
        document.getElementById("lobby_card").style.backgroundColor = "#310e0e";
    }
}

function action_conn_setip() {
    const newip = prompt("Enter IP address (for example: 192.168.0.100)");
    if (newip != "" && newip != ip) {
        localStorage.setItem("ip", newip);
        window.location.reload();
    }
}

async function action_conn_checkagain() {
    setConnStatusText(checkConnectionStatus());
}

async function action_startmatchmaking() {
    const status = getRequest("/api/startmatchmaking");
}

async function action_stopmatchmaking() {
    const status = getRequest("/api/stopmatchmaking");
}

async function getStatus() {
    const status = await getRequest("/api/displaystatus");

    if (status == "matchfound") {
        document.getElementById("statustitle").innerText = "Match found!";
        document.getElementById("statusdesc").innerText = "Please accept the match.";
        document.getElementById("acceptmatchbtn").style.display = "block";
        document.getElementById("lobby_card").style.backgroundColor = "#6bdb83";

        document.getElementById("mainmenuactions").style.display = "none";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "none";
        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "searchingmatch") {
        document.getElementById("statustitle").innerText = "Searching for match...";
        document.getElementById("statusdesc").innerText = "Searching for servers and players...";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#2c9442";

        document.getElementById("mainmenuactions").style.display = "none";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "block";
        document.getElementById("stopserverbtn").classList.add("bottomborderradius");
    } else if (status == "notinlobbyselectingmode") {
        document.getElementById("statustitle").innerText = "Selecting gamemode.";
        document.getElementById("statusdesc").innerText = "You are not in a lobby.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#4f4f4f";

        document.getElementById("mainmenuactions").style.display = "none";
        document.getElementById("matchmakingactions").style.display = "block";
        document.getElementById("searchingformatchactions").style.display = "none";
        document.getElementById("stopserverbtn").classList.add("bottomborderradius");
    } else if (status == "inlobby") {
        document.getElementById("statustitle").innerText = "In lobby.";
        document.getElementById("statusdesc").innerText = "You are in a lobby.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#00519c";

        document.getElementById("mainmenuactions").style.display = "block";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "none";
        document.getElementById("stopserverbtn").classList.add("bottomborderradius");
    } else if (status == "notinlobby") {
        document.getElementById("statustitle").innerText = "All alone.";
        document.getElementById("statusdesc").innerText = "You are not in a lobby.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#6f6f6f";

        document.getElementById("mainmenuactions").style.display = "block";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "none";
        document.getElementById("stopserverbtn").classList.add("bottomborderradius");
    } else if (status == "playingct") {
        document.getElementById("statustitle").innerText = "In a match.";
        document.getElementById("statusdesc").innerText = "Playing as Counter-Terrorist.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#B3DDFF";

        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "playingt") {
        document.getElementById("statustitle").innerText = "In a match.";
        document.getElementById("statusdesc").innerText = "Playing as Terrorist.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#E9C565";

        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "died") {
        document.getElementById("statustitle").innerText = "You died.";
        document.getElementById("statusdesc").innerText = "You got owned. Womp womp.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#310e0e";

        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "buymenu") {
        document.getElementById("statustitle").innerText = "Buying gear.";
        document.getElementById("statusdesc").innerText = "You have the Buy Menu open.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#2f5674";
        
        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "spectating") {
        document.getElementById("statustitle").innerText = "Spectating.";
        document.getElementById("statusdesc").innerText = "You are spectating another player.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#adbaca";

        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "gamepaused") {
        document.getElementById("statustitle").innerText = "Game paused.";
        document.getElementById("statusdesc").innerText = "You paused the game.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#adbaca";

        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else if (status == "unknown") {
        document.getElementById("statustitle").innerText = "Unknown state.";
        document.getElementById("statusdesc").innerText = "Failed to detect what is happening.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#5f5f5f";

        document.getElementById("mainmenuactions").style.display = "none";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "none";
        document.getElementById("stopserverbtn").classList.add("allborderradius");
    } else {
        document.getElementById("statustitle").innerText = "Unknown state. (2)";
        document.getElementById("statusdesc").innerText = "Foreign response from server.";
        document.getElementById("acceptmatchbtn").style.display = "none";
        document.getElementById("lobby_card").style.backgroundColor = "#5f5f5f";

        document.getElementById("mainmenuactions").style.display = "none";
        document.getElementById("matchmakingactions").style.display = "none";
        document.getElementById("searchingformatchactions").style.display = "none";
        document.getElementById("stopserverbtn").classList.add("allborderradius");
    }

    if (laststate != status) {
        let historyText = document.getElementById("statustitle").innerText;
        addHistory(historyText, status);
    }
}

function addHistory(text, status) {
    console.log(text);
    laststate = status;

    var date = new Date;
    var hours = date.getHours();
    var minutes = date.getMinutes();

    let historyToPush = text + " (" + hours.toString() + ":" + minutes + ")";
    console.log(historyToPush);
    history.push(historyToPush);
    console.log(history);
    localStorage.setItem("history", JSON.stringify(history));
}

function switchPage(page) {
    if (page == "none")
        return

    // Play fade out animation
    if (set_pageanim == "enabled") {
        document.getElementById("bodytag").classList.remove("anim_fadein");
        document.getElementById("bodytag").classList.add("anim_fadeout");
    }

    // Switch page after 180ms
    setTimeout(() => {
        if (page == "home")
            document.location.href = "index.html";
        else if (page == "history")
            document.location.href = "history.html";
        else if (page == "computer")
            document.location.href = "computer.html";
        else if (page == "settings")
            document.location.href = "settings.html";
    }, 150)
}

async function checkConnectionStatus() {
    const connstat = await getRequest("/api/ping/");
    console.log(connstat);
    
    if (connstat == null) {
        return false;
    } else {
        return true;
    }
}

async function setConnStatusText(connStatus) {
    document.getElementById("connip").innerText = ip;

    if (await connStatus) {
        document.getElementById("connstatus").innerText = "Connected";
    } else {
        document.getElementById("connstatus").innerText = "Disconnected";
    }
}

async function startIntervalCheck() {
    if (document.location.href.endsWith("index.html")) { // Only start statuscheck if user is on the main page
        let connStatus = await checkConnectionStatus()
        if (connStatus) {
            statuscheck = setInterval(getStatus, Number(set_checkfreq));
            //clearInterval(statuscheck);
        } else {
            console.log("User disconnected.");
            document.getElementById("statustitle").innerText = "Disconnected.";
            document.getElementById("statusdesc").innerText = "You are not connected to a server.";
            document.getElementById("acceptmatchbtn").style.display = "none";
            document.getElementById("lobby_card").style.backgroundColor = "#4f4f4f";
        }
    
    } else if (document.location.href.endsWith("computer.html")) { // Only check connection status if user is on computer page
        setConnStatusText(checkConnectionStatus())
    }
}

startIntervalCheck()