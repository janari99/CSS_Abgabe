
import DeviceMotionWrapper from "./DeviceOrientationWrapper.js";


let orientationData = [];
let deviceMotionWrapper = new DeviceMotionWrapper();

document.getElementById('toggle-switch').addEventListener('change', function(event) {
    if (event.target.checked) {
        try {
            console.log('Enabling device orientation');
            deviceMotionWrapper.enable(handleOrientationEvent);
        } catch (error) {
            console.error(error);
            document.getElementById('error-message').innerHTML = error.message;
        }
    } else {
        deviceMotionWrapper.disable();
        downloadCSV();
    }
});

function handleOrientationEvent(event) {
    var acceleration = event.acceleration;
    var accelerationIncludingGravity = event.accelerationIncludingGravity;
    var rotationRate = event.rotationRate;

    document.getElementById('motion-data').innerHTML = 
        'Acceleration: ' + acceleration.x + ', ' + acceleration.y + ', ' + acceleration.z + '<br>' + 
        'Acceleration including gravity: ' + accelerationIncludingGravity.x + ', ' + accelerationIncludingGravity.y + ', ' + accelerationIncludingGravity.z + '<br>' + 
        'Rotation rate: ' + rotationRate.alpha + ', ' + rotationRate.beta + ', ' + rotationRate.gamma;

    orientationData.push({ acceleration, accelerationIncludingGravity, rotationRate, timestamp: new Date().toISOString() });

}

function downloadCSV() {
    const header = Object.keys(orientationData[0]).join(',');
    const rows = orientationData.map(obj => Object.values(obj).join(',')).join('\n');
    const csvContent = `${header}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orientation_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

console.log('Hello from logic.ts');