import flask
import pyscreeze # even if not in use, pyautogui requires it
import pyautogui
import time

app = flask.Flask(__name__)

@app.route('/')
def home():
    return flask.send_file("homepage.html")

@app.route("/api/displaystatus")
def displaystatus():
    # Check if CS is searching for a match
    try:
        pyautogui.locateOnScreen('static/cut/searchingformatch.png')
        return "searchingmatch"
    except pyautogui.ImageNotFoundException:
        pass
    

    # Check if a match has been found
    try:
        pyautogui.locateOnScreen('static/cut/matchfound_acceptbtn.png')
        return "matchfound"
    except pyautogui.ImageNotFoundException:
        pass


    # Check if player is in lobby
    try:
        pyautogui.locateOnScreen('static/cut/inlobby_multipleicons_extendedsidebar.png')
        return "inlobby"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/cut/inlobby_friendcountericon_minifiedsidebar.png')
        return "inlobby"
    except pyautogui.ImageNotFoundException:
        pass
        
    
    # Check if player is not in a lobby
    try:
        pyautogui.locateOnScreen('static/cut/notinlobby_multipleicons_extendedsidebar.png')
        return "notinlobby"
    except pyautogui.ImageNotFoundException:
        pass

    try:
        pyautogui.locateOnScreen('static/cut/notinlobby_friendcountericon_minifiedsidebardebar.png')
        return "notinlobby"
    except pyautogui.ImageNotFoundException:
        pass
    

@app.route("/api/isplayerinlobby")
def isplayerinlobby():
    try:
        pyautogui.locateOnScreen('static/cut/inlobby_friendcountericon_minifiedsidebar.png')
        inlobby = True
    except pyautogui.ImageNotFoundException:
        inlobby = False

    if inlobby:
        return "yes"
    else:
        return "no"

@app.route("/api/ismatchfound")
def ismatchfound():
    try:
        pyautogui.locateOnScreen('static/cut/matchfound_acceptbtn.png')
        inlobby = True
    except pyautogui.ImageNotFoundException:
        inlobby = False

    if inlobby:
        return "yes"
    else:
        return "no"
    



if __name__ == '__main__':
    app.run(debug=True)
