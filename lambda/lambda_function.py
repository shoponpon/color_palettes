import numpy as np
import base64
import cv2
import re
import image_to_dot

def lambda_handler(event,context):
    if not validateInput(event):
        return {
            "status": 400,
            "message": "Inputs are invalid."
        }
    binary = event['binary']
    colors = [
        event['color1'],
        event['color2'],
        event['color3'],
        event['color4']
    ]
    input_image = load_binary_image(binary)
    output_image = image_to_dot.image2dot(input_image,image_to_dot.colorcodes2rgbs(colors))
    retval, buffer = cv2.imencode('.png', output_image)
    output_binary = 'data:image/png;base64,'+base64.b64encode(buffer).decode("UTF-8")
    return {
        "status":200,
        "binary":output_binary
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
    colors = ['#F38181','#FCE38A','#EAFFD0','#95E1D3']
    event = {
        "binary":input_binary,
        "color1":colors[0],
        "color2":colors[1],
        "color3":colors[2],
        "color4":colors[3]
    }
    context = {}
    response = lambda_handler(event,context)
    if response['status'] == 200:
        img = load_binary_image(response["binary"])
        cv2.imshow('img',img)
        cv2.waitKey(0)
    else:
        print(response['message'])