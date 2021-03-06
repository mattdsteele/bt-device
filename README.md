# `<bt-device>`

A small (900 byte) Custom Element to make [Web Bluetooth](https://steele.blue/web-bluetooth/) a little easier to use.

**See it in action** (with a Bluetooth heart rate monitor): https://output.jsbin.com/mohezur/11

More details here: https://steele.blue/renderless-web-components/

## Usage

Import it via your method of choice, but unpkg works great:

```html
<script type="module" src="https://unpkg.com/bt-device?module"></script>
```

Then add a (render-less) element to your page with the settings you'd like:

<!-- prettier-ignore -->
```html
<bt-device
  service="40fc0000-8a8d-4a32-a455-c1148e24a9f1"
  characteristic="40fc0001-8a8d-4a32-a455-c1148e24a9f1"
  notifications="true"
></bt-device>
```

## Properties

`service: string`

The GATT service you wish to interact with. Can be a UUID or a [standardized service](https://www.bluetooth.com/specifications/gatt/services/)

`characteristic: string`

The GATT characteristic you wish to interact with. Can be a UUID or a [standardized characteristic](https://www.bluetooth.com/specifications/gatt/characteristics/)

`notifications: boolean`

Whether to receive notifications (event stream) from the characteristic after connecting.

`parse: DataView => any`

An optional function property you can use to "shape" the raw binary data coming from the Bluetooth device. Set this property to a function and it will be executed each time your characteristic emits data:

```js
btDevice.parse = (input) {
  const percentLeft = input.getUint8(0) / 2;
  return percentLeft;
}
```

`connectOptions: Object`

Override the auto-generated connection options object. See https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice for details

## Generated Properties

`btService: BluetoothRemoteGATTService`

Once connected, provides access to the service interface

`btChar: BluetoothGATTCharacteristic`

Once connected, provides access to the characteristic interface

## Methods

`connect(): Promise<void>`

Attempts to connect to the Bluetooth device

## Events

`data: CustomEvent<any>`

Emitted whenever the `characteristicvaluechanged` event occurs. Will contain an object that contains the data (passed through `parse` if it is set).

```js
btDevice.addEventListener('data', (e) => {
  const value = e.detail.value;
  console.log(value);
});
```
