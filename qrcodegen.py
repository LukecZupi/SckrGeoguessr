import qrcode

def createQR():
    img = qrcode.make("http://192.168.0.35:5000/control")
    img.save("static/qr.png")