function myFunction() {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['user_data'] }] })
    .then(device => {
        console.log(device.name); 
        return device.gatt.connect();
    })
    .catch(error => { console.log(error); });
}
