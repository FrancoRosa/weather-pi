# The following scripts takes snapshots from webpages using chrome or chromium (its open source version)
# more info can be found here https://developers.google.com/web/updates/2017/04/headless-chrome
from os import system

urls = [
  'https://hackaday.com/',
  'https://www.google.com/',
  'https://www.nytimes.com/',
]

command = 'chromium-browser --headless --disable-gpu --screenshot --window-size=400,300 ' 
command = 'chromium --headless --disable-gpu --screenshot --window-size=400,300 ' 

for i in range(len(urls)):
  print('... getting data from %s'%urls[i])
  system(command+urls[i])
  print('... screenshot saved')
  system('mv screenshot.png screenshot_%d.png'%i)
