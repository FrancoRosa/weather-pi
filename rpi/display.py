#!/usr/bin/env python3

import argparse
import random
import sys
from inky import InkyWHAT
from PIL import Image, ImageFont, ImageDraw
from font_source_serif_pro import SourceSerifProSemibold

inkyDisplay = InkyWHAT("black")
inkyDisplay.set_border(inkyDisplay.BLACK)
w = inkyDisplay.WIDTH
h = inkyDisplay.HEIGHT
fontHeight = 14;
paddingY = 3;
paddingX = 5;
hSteep = h / (fontHeight + paddingY);

img = Image.new("P", (inkyDisplay.WIDTH, inkyDisplay.HEIGHT))
draw = ImageDraw.Draw(img)
font = ImageFont.truetype(SourceSerifProSemibold, 16)

# read text file
lines = {}
try:
    txtData = open('./forecast.txt', 'r')
    lines = txtData.readlines()
except Exception as e:
    lines = {}

#draw text
count = 0
for line in lines:
    count += 1
    msg = line.strip()
    msgW, msgH = draw.textsize(msg)
    xCoord = (w - msgW)/2
    if count > 6:
        xCoord = paddingX
    yCoord = paddingY + (hSteep * (count - 1))
    draw.text((xCoord, yCoord), msg, fill=inkyDisplay.BLACK, font=font)
    
#display
inkyDisplay.set_image(img)
inkyDisplay.show()
