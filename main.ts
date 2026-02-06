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
loops.everyInterval(60000, function () {
    if (logging) {
        datalogger.log(
        datalogger.createCV("temperature", input.temperature()),
        datalogger.createCV("light", input.lightLevel())
        )
    }
})
