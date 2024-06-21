/**
 * This class is used to get the device orientation more easily.
 *
 * @author Dennis Moschina
 * @version 1.0
 */
class DeviceMotionWrapper {
    enabled;
    sensor;
    callback;

    constructor() {
        this.enabled = false;
        this.sensor = null;
        this.callback = null;
    }

    async enable(callback) {
        if (typeof DeviceMotionEvent === 'undefined') {
            throw new Error('DeviceMotion is not supported');
        }

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            let permission;
            try {
                permission = await DeviceMotionEvent.requestPermission();
            } catch {
                throw new Error('cant ask for permission');
            }
            if (permission !== 'granted') {
                throw new Error('Permission to use DeviceMotion was not granted');
            }
        }

        this.callback = callback;
        window.addEventListener('devicemotion', this.onDeviceMotionChange);
        this.enabled = true;
    }

    disable() {
        if (!this.enabled) {
            return;
        }
        window.removeEventListener('DeviceMotion', this.onDeviceMotionChange);
        this.callback = null;
        this.enabled = false;
    }

    onDeviceMotionChange = (event) => {
        if (this.callback) {
            this.callback(event);
        }
    }
}


export default DeviceMotionWrapper;
