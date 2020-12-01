# Browser Wii Remote

## Connect to a Wii Remote from the browser!

Support varies, check browser compatibility with [HID](https://caniuse.com/?search=hid) and [Web Bluetooth](https://caniuse.com/?search=web%20bluetooth) (optional, but simple) APIs. You will likely need to instruct users to toggle a flag in their browser. In Google Chrome on Ubuntu, I had to give access to `/dev/hidraw`.

Thanks to the team at [Wiibrew](https://wiibrew.org/wiki/Wiimote) for making this easier to implement. This also had some inspiration from [GiiMote](https://code.google.com/archive/p/giimote/)

## Current Support

Checked boxes are supported, unchecked are in consideration

### Feedback

- [x] Rumble
- [x] LEDs

### Input

- [x] Button data
- [x] Accelerometer
- [ ] IR
- [ ] Extension Controllers
- [ ] Flash memory storage
- [ ] Sound

### Misc

- [x] Establishing a connection
- [ ] Events on connect / disconnect / reconnect
- [ ] Multiple connections at once (needs verification & scoping)

## Connecting

1. Import the default export and call it **with a user gesture** such as an onClick listener. You can skip this if the wii remote is already paired (first param as false)
2. The promise from 1 should return a callback. This callback connects via the HID APIs and should also be in a user gesture.
3. The promise above should return a WiiRemote object. You can use this to interact with the Wii Remote

Overall, it looks like this:

```ts

import EstablishWiiRemoteConnection from 'browser-wii-remote'

let remote = null

EstablishWiiRemoteConnection(showBluetoothDialog?: boolean, inputMode?: WiiRemoteReportModes)
.then(connectViaHID => connectViaHID()
.then(wiiRemote => remote = wiiRemote))
```

Of course, many things can go wrong, so error handling should be done. `EstablishWIiRemoteConnection` and `connectViaHID` need to be called on a user gesture (you will get an error).

## Using the WiiRemote object

### Rumble

```ts
setRumble(value: boolean)
```

Set the rumble on or off

### LEDs

```ts
setLED(led: LEDS, active: boolean)
```

LEDS is an enum that can be imported

### Report modes

```ts
setReportMode(mode: WiiRemoteReportModes)
```

Determine what data the Wii Remote will send.

Modes include (checked are implemented in this library)

- [x] CORE_BUTTONS
- [x] CORE_BUTTONS_AND_ACCEL
- [ ] CORE_BUTTONS_AND_8_EXTENSION_BYTES
- [ ] CORE_BUTTONS_ACCEL_IR
- [ ] CORE_BUTTONS_AND_19_EXTENSION_BYTES
- [ ] CORE_BUTTONS_ACCEL_16_EXTENSION_BYTES

### Event Listeners

There are two types of listeners as of now. Buttons and Accelerometer.

#### Adding

```ts
addListener(
    event: WiiRemoteStateAccel | WiiRemoteStateKeys,
    callback: function({
            previous: boolean | number, // Previous state
            current: boolean | number, // Current state
        },
        {
        // Full current Wii Remote state, can be used for easy button combinations
        // Keys of the object are the total options of the event
        }
    )
)
```

Buttons are booleans and accelerometer events are numbers

#### Removing

```ts
removeListener(event: WiiRemoteStateAccel | WiiRemoteStateKeys, callback: AboveFunction)
```

You can also remove references of events
