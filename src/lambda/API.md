# API ドキュメント [/image_to_pdf]
画像の色を減色して，色を置き換えるAPIです．

## 減色&色変更した画像を得る [POST]
画像を減色して，色を置換，dbに保存します．

+ Request (application/json)

    + Body

        {
            "color1": "color_code",
            "color2": "color_code",
            "color3": "color_code",
            "color4": "color_code"
        }

+ Response 200 (application/json)

    + Body

        {
            "status": 200,
            "binary": "base64 encoded image"
        }

        or

        {
            "status": 400,
            "message": "error message"
        }
        