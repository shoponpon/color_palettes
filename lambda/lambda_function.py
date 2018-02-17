# -*- coding: utf-8 -*-

import numpy as np
import base64
import cv2
import re
import image_to_dot
import record_palettes

#平滑化フィルタ
n8 = np.array([[1, 1, 1],
               [1, 1, 1],
               [1, 1, 1]],
              np.uint8)

n4 = np.array([[0, 1, 0],
               [1, 1, 1],
               [0, 1, 0]],
              np.uint8)

def lambda_handler(event,context):
 
    #validation of inputs
    if not validateInput(event):
        palettes = record_palettes.getPalettes()
        return {
            "status": 400,
            "message": "Inputs are invalid.",
            "palettes": palettes
        }
    binary = event['binary']
    colors = [
        event['color1'],
        event['color2'],
        event['color3'],
        event['color4']
    ]
    mosaic_num= event['mosaic_num']

    #store colors to db
    record_palettes.record_palette(colors)
    palettes = record_palettes.getPalettes()

    #image processing
    image = load_binary_image(binary)
    
    #(オプション)平滑化
    #image = cv2.erode(image, n8, iterations=1)

    #resize - to mini
    size = image.shape[:2][::-1]
    image = cv2.resize(image,(int(size[0]/mosaic_num),int(size[1]/mosaic_num)),interpolation=cv2.INTER_NEAREST)

    #change color
    image = image_to_dot.image2dot(image,image_to_dot.colorcodes2rgbs(colors))

    #resize - to original
    image = cv2.resize(image,size,interpolation=cv2.INTER_NEAREST)

    #(オプション)グリッチ    

    #encode with base64
    _, buffer = cv2.imencode('.png', image)
    output_binary = 'data:image/png;base64,'+base64.b64encode(buffer).decode("UTF-8")
    return {
        "status":200,
        "binary":output_binary,
        "palettes":palettes
    }

def validateInput(request):
    if request['binary'] == None:
        return False
    pattern = r"#[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]"
    repatter = re.compile(pattern)
    if request['color1'] == None:
        return False
    else:
        if repatter.match(request['color1']) and len(request['color1']) == 7:
            pass
        else:
            return False
    if request['color2'] == None:
        return False
    else:
        if repatter.match(request['color2']) and len(request['color2']) == 7:
            pass
        else:
            return False
    if request['color3'] == None:
        return False
    else:
        if repatter.match(request['color3']) and len(request['color3']) == 7:
            pass
        else:
            return False
    if request['color4'] == None:
        return False
    else:
        if repatter.match(request['color4']) and len(request['color4']) == 7:
            pass
        else:
            return False
    if request['mosaic_num'] <= 1 and request['mosaic_num'] > 16:
        return False
    return True

def load_binary_image(binary):
    encoded_data = binary.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

if __name__=='__main__':
    import sys
    img = cv2.imread(sys.argv[1])
    retval, buffer = cv2.imencode('.png', img)
    input_binary = 'data:image/png;base64,'+base64.b64encode(buffer).decode("UTF-8")
    colors = ['#2D380A', '#61661E', '#92A730', '#CDDD5C']
    event = {
        "binary":input_binary,
        #"binary":None,
        "color1":colors[0],
        "color2":colors[1],
        "color3":colors[2],
        "color4":colors[3],
        "mosaic_num":2
    }
    context = {}
    response = lambda_handler(event,context)
    if response['status'] == 200:
        print(response['palettes'])
        img = load_binary_image(response["binary"])
        cv2.imshow('img',img)
        cv2.waitKey(0)
    else:
        print(response['message'])
        print(response['palettes'])
