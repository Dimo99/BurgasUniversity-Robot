import RPi.GPIO as GPIO
from flask import Flask, url_for, render_template, request
#set GPIO numbering mode and define output pins
forwardRight = 3
forwardLeft = 13
backwardRight = 5
backwardLeft = 11
light = 19
speed = 50
isMoovingForward = False
GPIO.setmode(GPIO.BOARD)
GPIO.setup(3,GPIO.OUT)
GPIO.setup(5,GPIO.OUT)
GPIO.setup(7,GPIO.OUT)
GPIO.setup(11,GPIO.OUT)
GPIO.setup(13,GPIO.OUT)
GPIO.setup(15,GPIO.OUT)
GPIO.setup(19,GPIO.OUT)
GPIO.setup(37,GPIO.OUT)
GPIO.setup(31,GPIO.IN)
my_pwm1=GPIO.PWM(7,	10000)
my_pwm2=GPIO.PWM(15,10000)
def my_callback_one(channel):
	if GPIO.input(31) and isMoovingForward:
		print(GPIO.input(31))
		my_pwm1.stop();
		my_pwm2.stop();
		GPIO.output(backwardLeft,False)
		GPIO.output(backwardRight,False)
		GPIO.output(forwardLeft,False)
		GPIO.output(forwardRight,False)
		global isMoovingForward
		isMoovingForward = False
GPIO.add_event_detect(31, GPIO.RISING, callback=my_callback_one)
app = Flask(__name__)
@app.route('/')
def root():
	return render_template('index.html')
@app.route('/up')
def move_up():
	print('Robot moves up now')
	print(speed)
	my_pwm1.stop();
	my_pwm2.stop();
	my_pwm1.start(speed);
	my_pwm2.start(speed);
	GPIO.output(backwardLeft,False)
	GPIO.output(backwardRight,False)
	GPIO.output(forwardLeft,True)
	GPIO.output(forwardRight,True)
	global isMoovingForward
	isMoovingForward = True
	return ""
@app.route('/down')
def move_down():
	print('Robot moves down now')
	print(speed)
	my_pwm1.stop();
	my_pwm2.stop();
	my_pwm1.start(speed);
	my_pwm2.start(speed);
	GPIO.output(backwardLeft,True)
	GPIO.output(backwardRight,True)
	GPIO.output(forwardLeft,False)
	GPIO.output(forwardRight,False)
	return ""
@app.route('/left')
def move_left():
	print('Robot moves left now')
	print(speed)
	my_pwm1.stop();
	my_pwm2.stop();
	my_pwm1.start(speed);
	my_pwm2.start(speed);
	GPIO.output(backwardLeft,False)
	GPIO.output(backwardRight,False)
	GPIO.output(forwardLeft,True)
	GPIO.output(forwardRight,False)
	return ""
@app.route('/right')
def move_right():
	print('Robot moves right now')
	print(speed)
	my_pwm1.stop();
	my_pwm2.stop();
	my_pwm1.start(speed);
	my_pwm2.start(speed);
	GPIO.output(backwardLeft,False)
	GPIO.output(backwardRight,False)
	GPIO.output(forwardLeft,False)
	GPIO.output(forwardRight,True)
	return ""
@app.route('/release')
def release():
	print('Robot relased')
	my_pwm1.stop();
	my_pwm2.stop();
	GPIO.output(backwardLeft,False)
	GPIO.output(backwardRight,False)
	GPIO.output(forwardLeft,False)
	GPIO.output(forwardRight,False)
	global isMoovingForward
	isMoovingForward = False
	return ""
@app.route('/far')
def far():
	print('Lighting')
	GPIO.output(light,True)
	return ""
@app.route('/lightrelease')
def lightRelease():
	print('Lights stoped')
	GPIO.output(light,False)
	return ""
@app.route('/speed')
def changeSpeed():
	global speed
	speed = float(request.args.get('s'))
	print('Changed speed = '+str(speed))
	return ""
app.run(host='0.0.0.0',port=80)