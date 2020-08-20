function myFunction() {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['user_data'] }] })
    .then(device => {
        console.log(device.name); 
        return device.gatt.connect();
    })
    .then(server => { return server.getPrimaryService('user_data'); })
    .then(service => { return service.getCharacteristic('analog_output'); })
    .then(characteristic => { return characteristic.readValue(); })
    .then(value => { console.log("EMG value is: " + value.getUint8(0)); })
    .catch(error => { console.log(error); });
}
