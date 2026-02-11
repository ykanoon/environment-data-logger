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
    if (logging) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . . . #
            # . . . #
            . # # # .
            `)
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.No)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumns([
    "datetime",
    "temp_CPU",
    "temp_OUT",
    "moist_lv",
    "light"
    ])
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
timeanddate.setDate(DS3231.month(), DS3231.date(), DS3231.year())
timeanddate.set24HourTime(DS3231.hour(), DS3231.minute(), DS3231.second())
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
datalogger.setColumns([
"datetime",
"temp_CPU",
"temp_OUT",
"moist_lv",
"light"
])
basic.clearScreen()
loops.everyInterval(900000, function () {
    if (logging) {
        datalogger.logData([
        datalogger.createCV("datetime", timeanddate.dateTime()),
        datalogger.createCV("temp_CPU", input.temperature()),
        datalogger.createCV("temp_OUT", stem.TP2_getTemperature()),
        datalogger.createCV("moist_lv", pins.analogReadPin(AnalogReadWritePin.P1)),
        datalogger.createCV("light", input.lightLevel())
        ])
    }
})
