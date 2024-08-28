import pyscreeze
import pyautogui
import time

time.sleep(4)

location = pyautogui.locateOnScreen('static/cut/notinlobby_friendcountericon_minifiedsidebar.png')
print(location)