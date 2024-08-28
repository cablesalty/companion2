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
    # Check if a match has been found
    try:
        pyautogui.locateOnScreen('static/cut/matchfound_acceptbtn.png')
        return "matchfound"
    except pyautogui.ImageNotFoundException:
        pass

    # Check if CS is searching for a match
    try:
        pyautogui.locateOnScreen('static/cut/searchingformatch.png')
        return "searchingmatch"
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
        pyautogui.locateOnScreen('static/cut/notinlobby_friendcountericon_minifiedsidebar.png')
        return "notinlobby"
    except pyautogui.ImageNotFoundException:
        pass

    return "unknown"
    

@app.route("/api/acceptmatch")
def acceptmatch():
    try:
        location = pyautogui.locateOnScreen('static/cut/matchfound_acceptbtn.png')
        pyautogui.click(pyautogui.center(location))
        return "ok"
    except pyautogui.ImageNotFoundException:
        return "matchnotfound"

if __name__ == '__main__':
    app.run(debug=True)
