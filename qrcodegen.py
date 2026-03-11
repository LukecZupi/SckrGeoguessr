import qrcode
import socket

hostname = socket.gethostname()
IPAddr = socket.gethostbyname(hostname)
print("Your Computer IP Address is:", IPAddr)

def createQR():
    qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=1,
    )
    qr.add_data('http://{IPAddr}/control')
    qr.make(fit=True)

    img = qr.make_image(fill_color="black")
    img.save("static/images/qr.png")