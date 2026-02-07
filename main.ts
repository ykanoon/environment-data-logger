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
    datalogger.setColumnTitles(
    "temp_CPU",
    "light",
    "temp_OUT",
    "moist_lv",
    "year",
    "month",
    "date",
    "hour",
    "min",
    "sec"
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
"temp_CPU",
"light",
"temp_OUT",
"moist_lv",
"year",
"month",
"date",
"hour",
"min",
"sec"
)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
basic.clearScreen()
loops.everyInterval(60000, function () {
    if (logging) {
        datalogger.log(
        datalogger.createCV("temp_CPU", input.temperature()),
        datalogger.createCV("light", input.lightLevel()),
        datalogger.createCV("temp_OUT", stem.TP2_getTemperature()),
        datalogger.createCV("moist_lv", pins.analogReadPin(AnalogReadWritePin.P1)),
        datalogger.createCV("year", DS3231.year()),
        datalogger.createCV("month", DS3231.month()),
        datalogger.createCV("date", DS3231.date()),
        datalogger.createCV("hour", DS3231.hour()),
        datalogger.createCV("min", DS3231.minute()),
        datalogger.createCV("sec", DS3231.second())
        )
    }
})
