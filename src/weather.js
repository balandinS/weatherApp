export class Weather {
  constructor(nameCity, description) {
    this.nameCity = nameCity;
    this.description = description;
    this.temperature = "";
  }
}

export const handlerProxy = {
  get: function(target, property) {
    return Reflect.get(target, property);
  },

  set: function(target, property, value) {
    return Reflect.set(target, property, value);
  }
};
