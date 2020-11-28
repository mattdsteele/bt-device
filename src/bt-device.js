export class BTDevice extends HTMLElement {
  static get observedAttributes() {
    return ['service', 'characteristic', 'notifications'];
  }
  async connect() {
    const service = this.prop('service');
    const options = {
      filters: [
        {
          services: [service],
        },
      ],
    };
    this.device = await navigator.bluetooth.requestDevice(options);
    this.gatt = await this.device.gatt.connect();
    this.btService = await this.gatt.getPrimaryService(this.prop('service'));
    this.btChar = await this.btService.getCharacteristic(
      this.prop('characteristic')
    );
    if (!this.device) {
      throw 'No device selected';
    }
    if (this.prop('notifications')) {
      await this.btChar.startNotifications();
      this.btChar.addEventListener('characteristicvaluechanged', (ev) => {
        let { value } = ev.target;
        if (this.parse) {
          value = this.parse(value);
        }
        this.dispatchEvent(
          new CustomEvent('data', {
            detail: {
              value,
            },
          })
        );
      });
    }
    this.device.addEventListener('gattserverdisconnected', (e) =>
      this.onDisconnected(e)
    );
  }
  onDisconnected(event) {
    console.log('redisconnected', event);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }
  prop(name) {
    return this[name] || this.getAttribute(name);
  }
}
