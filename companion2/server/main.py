import flask
from flask_cors import CORS, cross_origin
import pyscreeze # even if not in use, pyautogui requires it
import pyautogui
import os
import socket

def locate(imagePath, confidence=0.999): # locate an image on the screen
    try:
        pyautogui.locateOnScreen(imagePath, confidence=confidence)
        return True
    except pyautogui.ImageNotFoundException:
        return False

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def home(): # Returns the front-end
    return flask.send_file("webfrontend.html")

@app.route("/api/displaystatus")
@cross_origin()
def displaystatus(): # Returns what's happening on the screen.
    if locate('static/matchfound_acceptbtn.png'):
        return "matchfound"
    elif locate('static/searchingformatch_extendedsidebar.png', 0.9) or locate('static/searchingformatch_minifiedsidebar2.png', 0.9) or locate('static/cancelsearchbtn.png', 0.9):
        return "searchingmatch"
    elif locate('static/notinlobby_selectingmatch.png'):
        return "notinlobbyselectingmode"
    elif locate('static/inlobby_multipleicons_extendedsidebar.png') or locate('static/inlobby_friendcountericon_minifiedsidebar.png'):
        return "inlobby"
    elif locate('static/notinlobby_multipleicons_extendedsidebar.png') or locate('static/notinlobby_friendcountericon_minifiedsidebar.png'):
        return "notinlobby"
    elif locate('static/playing_ct.png', 0.8):
        return "playingct"
    elif locate('static/playing_t.png', 0.8):
        return "playingt"
    elif locate('static/died.png', 0.9) or locate('static/died2.png', 0.9):
        return "died"
    elif locate('static/spectating.png', 0.8):
        return "spectating"
    elif locate('static/buymenu.png', 0.8):
        return "buymenu"
    else:
        return "unknown"
    

@app.route("/api/acceptmatch")
@cross_origin()
def acceptmatch(): # Searches for an accept button and accepts the match.
    try:
        location = pyautogui.locateOnScreen('static/matchfound_acceptbtn.png')
        pyautogui.click(pyautogui.center(location))
        pyautogui.click() # double click 
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "matchnotfound"
    
@app.route("/api/startmatchmaking")
@cross_origin()
def startmatchmaking(): # Starts matchmaking
    try:
        pyautogui.moveTo(100, 100) # Do this to not block the button accidentally with a dialog
        location = pyautogui.locateOnScreen('static/gobtn.png', confidence=0.8)
        pyautogui.click(pyautogui.center(location), duration=0.1)
        pyautogui.click() # double click 
        pyautogui.moveTo(100, 100) # Do this to not block the button from getting found again
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "fail"
    
@app.route("/api/stopmatchmaking")
@cross_origin()
def stopmatchmaking(): # Stops matchmaking
    try:
        pyautogui.moveTo(100, 100) # Do this to not block the button accidentally with a dialog
        location = pyautogui.locateOnScreen('static/cancelsearchbtn.png', confidence=0.8)
        pyautogui.click(pyautogui.center(location))
        pyautogui.click() # double click 
        pyautogui.moveTo(100, 100) # Do this to not block the button from getting found again
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "fail"
    
@app.route("/api/stop")
@cross_origin()
def stop(): # Stops the server completely.
    os._exit(0)

@app.route("/api/ping/")
@cross_origin()
def pingpong(): # Ping api for connection testing
    return "pong"

if __name__ == '__main__':
    # Resolve local IP (to bind to)
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    localip = s.getsockname()[0]
    s.close()

    print("---------------------------------------------")
    print("You can access companion2 from your phone by entering this")
    print("into your preferred browser:")
    print()
    print("http://" + localip + ":5000")
    print("---------------------------------------------")

    # Start Flask
    app.run(debug=False, host=localip)