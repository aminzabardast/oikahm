import { murmur3 } from "murmurhash-js";

type OIKAHMKey = string;
type HashMap = { [key: OIKAHMKey]: any };

class OIKAHM {
  private _hash_map: HashMap = {};
  constructor() {}
  set(key: OIKAHMKey, value: any) {
    this._hash_map[this.hashKey(key)] = value;
  }
  get(key: OIKAHMKey) {
    return this._hash_map[this.hashKey(key)];
  }
  private hashKey(key: OIKAHMKey) {
    return murmur3(key);
  }
}

export default OIKAHM;
export { type OIKAHMKey };
