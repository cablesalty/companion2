import flask
import pyscreeze # even if not in use, pyautogui requires it
import pyautogui
import os

app = flask.Flask(__name__)

@app.route('/')
def home(): # Returns the front-end
    return flask.send_file("homepage.html")

@app.route("/api/displaystatus")
def displaystatus(): # Returns what's happening on the screen.
    # Check if a match has been found
    try:
        pyautogui.locateOnScreen('static/matchfound_acceptbtn.png')
        return "matchfound"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if CS is searching for a match
    try:
        pyautogui.locateOnScreen('static/searchingformatch_extendedsidebar.png', confidence=0.9)
        return "searchingmatch"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/searchingformatch_minifiedsidebar2.png', confidence=0.9)
        return "searchingmatch"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if player is selecting a gamemode (not in lobby)
    try:
        pyautogui.locateOnScreen('static/notinlobby_selectingmatch.png')
        return "notinlobbyselectingmode"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if player is in lobby
    try:
        pyautogui.locateOnScreen('static/inlobby_multipleicons_extendedsidebar.png')
        return "inlobby"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/inlobby_friendcountericon_minifiedsidebar.png')
        return "inlobby"
    except pyautogui.ImageNotFoundException:
        pass
        
    
    # Check if player is not in a lobby
    try:
        pyautogui.locateOnScreen('static/notinlobby_multipleicons_extendedsidebar.png')
        return "notinlobby"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/notinlobby_friendcountericon_minifiedsidebar.png')
        return "notinlobby"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if player is playing
    try:
        pyautogui.locateOnScreen('static/playing_ct.png', confidence=0.8)
        return "playingct"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/playing_t.png', confidence=0.8)
        return "playingt"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if player died
    try:
        pyautogui.locateOnScreen('static/died.png', confidence=0.9)
        return "died"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/died2.png', confidence=0.9)
        return "died"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if player is spectating
    try:
        pyautogui.locateOnScreen('static/spectating.png', confidence=0.8)
        return "spectating"
    except pyautogui.ImageNotFoundException:
        pass


    # Check if player is buying stuff
    try:
        pyautogui.locateOnScreen('static/buymenu.png', confidence=0.8)
        return "buymenu"
    except pyautogui.ImageNotFoundException:
        pass

    return "unknown"
    

@app.route("/api/acceptmatch")
def acceptmatch(): # Searches for an accept button and accepts the match.
    try:
        location = pyautogui.locateOnScreen('static/matchfound_acceptbtn.png')
        pyautogui.click(pyautogui.center(location))
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "matchnotfound"
    
@app.route("/api/startmatchmaking")
def startmatchmaking(): # Starts matchmaking
    try:
        location = pyautogui.locateOnScreen('static/gobtn.png')
        pyautogui.click(pyautogui.center(location))
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "fail"
    
@app.route("/api/stopmatchmaking")
def startmatchmaking(): # Stops matchmaking
    try:
        location = pyautogui.locateOnScreen('static/cancelsearchbtn.png')
        pyautogui.click(pyautogui.center(location))
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "fail"
    
@app.route("/api/stop")
def stop(): # Stops the server completely.
    os._exit(0)

if __name__ == '__main__':
    app.run(debug=True, host="192.168.0.100")
