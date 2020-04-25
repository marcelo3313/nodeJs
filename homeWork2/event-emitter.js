class EventEmitter {
  events = {};
  onceEvents = {};

  construnctor() {}

  on(event, func) {
    this.events[event] = this.events[event]
      ? this.events[event]
      : [];

    this.events[event].push(func);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((el) => el(...args));
    }

    if (this.onceEvents[event]) {
      this.onceEvents[event].forEach((el) => el());
      delete this.onceEvents[event];
    }
  }

  once(event, func) {
    this.onceEvents[event] = this.onceEvents[event]
      ? this.onceEvents[event]
      : [];


    this.onceEvents[event].push(func);
  }

  eventNames() {
    return [...Object.keys(this.events), ...Object.keys(this.onceEvents)];
  }

  listeners(event) {
    const events = this.events[event]
      ? this.events[event]
      : [];
    const once = this.onceEvents[event]
      ? this.onceEvents[event]
      : [];

    return [...events, ...once];
  }

  removeListener(event, func) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(el => el !== func);
    }

    if (this.onceEvents[event]) {
      this.onceEvents[event] = this.onceEvents[event].filter(el => el !== func);
    }
  }
}