# -*- coding: utf-8 -*-

import numpy as np
import base64
import cv2
import re
import image_to_dot
#import record_palettes

def lambda_handler(event,context):
 
    #palettes = record_palettes.getColorPalettes()

    #validation of inputs
    if not validateInput(event):
        return {
            "status": 400,
            "message": "Inputs are invalid.",
            #"palettes": palettes
        }
    binary = event['binary']
    colors = event['colors']
    mosaic_num = event['mosaic_num']
    smoothing = event['smoothing']
    contrast = event['contrast']
    gamma = event['gamma']

    #store colors to db
    #if len(palettes) > 0:
    #    if palettes[0]['colors'][0] == colors[0] and palettes[0]['colors'][1] == colors[1] and palettes[0]['colors'][2] == colors[2] and palettes[0]['colors'][3] == colors[3]:
    #        pass
    #    else:
    #        record_palettes.putColorPalette(colors)

    #image processing
    image = load_binary_image(binary)
    
    #options smoothing
    if smoothing == 1:
        image = cv2.erode(image, np.ones((3,3),np.uint8), iterations=1)

    if gamma == 1:
        gammaConst = 2.0
        lookup_table = np.ones((256,1),np.uint8) * 0
        for i in range(256):
            lookup_table[i][0] = 255 * pow(float(i)/255,1.0/gammaConst)
        image = cv2.LUT(image, lookup_table)

    if contrast == 1:
        min_table=100
        max_table=192
        diff_table=max_table-min_table
        lookup_table = np.arange(256,dtype='uint8')
        for i in range(0,min_table):
            lookup_table[i] = 0
        for i in range(min_table,max_table):
            lookup_table[i] = lookup_table[i] = 255 * (i - min_table) / diff_table
        for i in range(max_table,255):
            lookup_table[i] = 255
        image = cv2.LUT(image, lookup_table)

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
        #"palettes":palettes
    }

def validateInput(request):
    if request['binary'] == None:
        return False
    pattern = r"#[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]"
    repatter = re.compile(pattern)
    if request['colors'] == None:
        return False
    else:
        for c in request['colors']:
            if repatter.match(c) and len(c) == 7:
                pass
            else:
                return False
    if request['mosaic_num'] == None:
        return False
    else:
        if request['mosaic_num'] <= 1 and request['mosaic_num'] > 16:
            return False
    return True

def load_binary_image(binary):
    encoded_data = binary.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

if __name__=='__main__':
    import sys
    import time
    img = cv2.imread(sys.argv[1])
    retval, buffer = cv2.imencode('.png', img)
    input_binary = 'data:image/png;base64,'+base64.b64encode(buffer).decode("UTF-8")
    colors = ['#2D380A', '#61661E', '#92A730', '#CDDD5C','#AA0000']
    '''
    colors = [
        "#076248",
        "#7b60de",
        "#a7f539",
        "#67f890",
        "#8c7b64",
        "#109b37",
        "#a5503d",
        "#8221c6"
    ]
    '''
    event = {
        "binary":input_binary,
        #"binary":None,
        "colors":colors,
        #"color1":colors[0],
        #"color2":colors[1],
        #"color3":colors[2],
        #"color4":colors[3],
        "mosaic_num":2,
        "smoothing":1,
        "contrast":1,
        "gamma":1
    }
    context = {}
    start = time.time()
    response = lambda_handler(event,context)
    if response['status'] == 200:
        elapsed_time = time.time() - start
        print ("elapsed_time:{0}".format(elapsed_time) + "[sec]")
        #print(response['palettes'])
        img = load_binary_image(response["binary"])
        cv2.imshow('img',img)
        cv2.waitKey(0)
    else:
        print(response['message'])
        #print(response['palettes'])
