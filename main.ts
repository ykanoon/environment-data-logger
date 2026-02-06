datalogger.onLogFull(function () {
    logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    logging = true
    basic.showIcon(IconNames.Yes)
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function () {
    logging = true
    if (logging) {
        basic.showIcon(IconNames.Diamond)
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.No)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "temperature",
    "light"
    )
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    logging = false
    basic.showIcon(IconNames.No)
    basic.clearScreen()
})
let logging = false
logging = true
basic.showIcon(IconNames.Yes)
datalogger.setColumnTitles(
"temperature",
"light"
)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
basic.clearScreen()
loops.everyInterval(1000, function () {
    logging = true
    datalogger.log(
    datalogger.createCV("temperature", input.temperature()),
    datalogger.createCV("light", input.lightLevel()),
    datalogger.createCV("temp2", pins.digitalReadPin(DigitalPin.P0)),
    datalogger.createCV("year", DS3231.year()),
    datalogger.createCV("month", DS3231.month()),
    datalogger.createCV("date", DS3231.date()),
    datalogger.createCV("hour", DS3231.hour()),
    datalogger.createCV("min", DS3231.minute()),
    datalogger.createCV("sec", DS3231.second())
    )
    if (logging) {
    	
    }
})
