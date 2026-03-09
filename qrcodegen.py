import qrcode
import socket

hostname = socket.gethostname()
IPAddr = socket.gethostbyname(hostname)
print("Your Computer IP Address is:", IPAddr)

def createQR():
    img = qrcode.make(f"http://{IPAddr}/control")
    img.save("static/qr.png")