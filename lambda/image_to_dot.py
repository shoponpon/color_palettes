# -*- coding: utf-8 -*-

import numpy as np
import cv2
from PIL import Image

def image2dot(image,colors):
    colors = sorted(colors,key=cal_luminance)
    image = np.asarray(image)
    Z = image.reshape((-1,3))
    Z = Z.astype(np.float32)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    ret,label,center=cv2.kmeans(Z,len(colors),None,criteria,10,cv2.KMEANS_PP_CENTERS)
    center = np.uint8(center)
    res = center[label.flatten()]
    res = res.reshape((image.shape))
    if colors is not None:
        center = sorted(center,key=cal_luminance)
        for i in range(len(center)):
            res[np.where(np.all(res==center[i],axis=2))] = colors[i][::-1]
        center = colors
    else:
        center = center[:,::-1]
    return res

def colorcodes2rgbs(codes):
    rgbs = []
    for c in codes:
        rgbs.append(colorcode2rgb(c))
    return rgbs

def colorcode2rgb(code):
    return (int(code[1:3],16),int(code[3:5],16),int(code[5:7],16))

def cal_luminance(rgb):
    return rgb[0]*0.3+rgb[1]*0.6+rgb[2]*0.1

if __name__ == '__main__':
    import sys
    import time
    #img = cv2.imread(sys.argv[1])
    img = Image.open(sys.argv[1])
    gameboy_color = ['#2D380A', '#61661E', '#92A730', '#CDDD5C']
    start = time.time()
    img = image2dot(img,colorcodes2rgbs(gameboy_color))
    end = time.time()
    elapsed_time = time.time() - start
    print ("elapsed_time:{0}".format(elapsed_time) + "[sec]")
    cv2.imshow('img',img)
    cv2.waitKey(0)
