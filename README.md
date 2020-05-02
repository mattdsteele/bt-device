# `<bt-device>`

A Custom Element to make [Web Bluetooth](https://steele.blue/web-bluetooth/) a little easier to use.

## Usage

Import it via your method of choice, but unpkg works great

```html
<script type="module" src="https://unpkg.com/bt-device?module">
```

Then add a (render-less) element to your page with the settings you'd like:

<!-- prettier-ignore -->
```html
<bt-device
  service="40fc0000-8a8d-4a32-a455-c1148e24a9f1"
  characteristic="40fc0001-8a8d-4a32-a455-c1148e24a9f1"
  notifications="true"
/>
```

## Properties

`service`

The GATT service you wish to interact with. Can be a UUID or a [standardized service](https://www.bluetooth.com/specifications/gatt/services/)

`characteristic`

The GATT characteristic you wish to interact with. Can be a UUID or a [standardized characteristic](https://www.bluetooth.com/specifications/gatt/characteristics/)

`notifications`

Whether to receive notifications (event stream) from the characteristic after connecting.

`parse`

An optional function property you can use to "shape" the raw binary data coming from the Bluetooth device. Set this property to a function and it will be executed each time your characteristic emits data:

```js
btDevice.parse = (input) {
  const percentLeft = input.getUint8(0) / 2;
  return percentLeft;
}
```

## Methods

`connect()`

Attempts to connect to the Bluetooth device

## Events

`data`

Emitted whenever the `characteristicvaluechanged` event occurs. Will contain an object that contains the data (passed through `parse` if it is set).

```js
btDevice.addEventListener('data', (e) => {
  const value = e.detail.value;
  console.log(value);
});
```