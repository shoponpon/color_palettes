import sys
sys.path.append('./app')

from flask import Flask, request, jsonify
#from flask_cors import CORS
import numpy as np
import lambda_function

app = Flask(__name__)
#CORS(app)

@app.route('/pic2dot', methods=['POST'])
def api():
  event = {
    "binary":request.form['binary'],
    "colors":request.form['colors'].split(','),
    "mosaic_num":int(request.form['mosaic_num']),
    "smoothing":int(request.form['smoothing']),
    "contrast":int(request.form['contrast']),
    "gamma":int(request.form['gamma']),
  }
  response_obj = lambda_function.lambda_handler(event,{})
  return jsonify(response_obj)

@app.route('/')
def author():
  return '''
    shopon
    '''

if __name__ == '__main__':
  app.run(debug=True)
