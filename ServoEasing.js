ServoEasing servoTop;
ServoEasing servoBottom;
const int action_pin = 2;
int location = 31;

int bottom_closed = 107;
int top_closed = 167;
int bottom_open = 20;
int top_open = 20;
void setup()
{
pinMode(action_pin, INPUT_PULLUP);
servoTop.attach(9);
servoBottom.attach(10);
setSpeedForAllServos(190);
servoTop.setEasingType(EASE_CUBIC_IN_OUT);
servoBottom.setEasingType(EASE_CUBIC_IN_OUT);
synchronizeAllServosStartAndWaitForAllServosToStop();
}
void loop()
{
int proximity = digitalRead(action_pin);
if (proximity == LOW)
{
if (location > bottom_open) {
servoTop.setEaseTo(top_open);
servoBottom.setEaseTo(bottom_open);
synchronizeAllServosStartAndWaitForAllServosToStop();
location = bottom_open;
delay(600);
} else {
servoTop.setEaseTo(top_closed);
servoBottom.setEaseTo(bottom_closed);
synchronizeAllServosStartAndWaitForAllServosToStop();
location = bottom_closed;
delay(600);

        }   

    }

}