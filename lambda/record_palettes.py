# -*- coding :utf-8 -*-

import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime

dynamoDB = boto3.resource("dynamodb")
table = dynamoDB.Table("colorpalettes")

def getColorPalettes():
    try:
        queryData = table.query(
            KeyConditionExpression = Key("type").eq("palette") & Key("used_at").lte(str(datetime.now())), # 取得するKey情報
            ScanIndexForward = False,
            Limit = 10
        )
        return queryData["Items"]
    except Exception as e:
        print e

def putColorPalette(colors):
    try:
        table.put_item(
            Item={
                "type": "palette",
                "colors": colors,
                "used_at": str(datetime.now())
            }
        )
    except Exception as e:
        print e