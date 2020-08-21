// is based on https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web

function connectToBLE() {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['user_data'] }] })
    .then(device => {
        console.log(device.name); 
        return device.gatt.connect();
    })
    .then(server => { return server.getPrimaryService('user_data'); })
    .then(service => { return service.getCharacteristic('analog_output'); })
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => { 
        characteristic.addEventListener('characteristicvaluechanged', handleEMGValueChanged);
        console.log('Notifications have been started.');
     })
    .catch(error => { console.log(error); });
}

function handleEMGValueChanged(event) {
    // TODO: 8 bit unsigned is smaller than what we want, need to figure out how to read bigger numbers
    let value = event.target.value.getUint8(0);
    console.log("EMG value is: " + value);
    addValueToChart(value);
}
