**install dependencies**
pip install qrcode[pil] flask

**run script**
python app.py

anyone on the same network as the host machine can connect to the /display or /control routes with "http://{machine_ip}/display" or "http://{machine_ip}/control"
where machine_ip is generally the public ip of the machine.
you can also just access the website through the 2nd "running on ---" line.

**IMPORTANT**
To use the project correctly, you need to first access the /display page.
Do this either through the index page or directly through the link above.
**you need to do this only once after starting app.py**

*NOTE*
the correct classroom randomizes only upon visiting /display.
no matter how many times you access /control, the correct classroom won't change
if you don't visit /display in that time 

*possible error*
if python terminal returns 

"raise TypeError(
TypeError: The view function for 'getVariable' did not return a valid response. The function either returned None or ended without a return statement."

which is the same for browser console

"getVariable:1  Failed to load resource: the server responded with a status of 500 (INTERNAL SERVER ERROR)"

You never visited /display since starting app.py.
Load /display and reload /control to continue normally