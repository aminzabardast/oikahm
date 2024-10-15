import { murmur3 } from "murmurhash-js";
import hmacsha256 from "crypto-js/hmac-sha256";
import hex from "crypto-js/enc-hex";
import isString from "lodash.isstring";
import isArray from "lodash.isarray";
import map from "lodash.map";
import every from "lodash.every";
import sortBy from "lodash.sortby";
import join from "lodash.join";
import isObject from "lodash.isobject";
import keys from "lodash.keys";
import values from "lodash.values";

type OIKAHMStringKey = string;
type OIKAHMArrayKey = string[];
type OIKAHMObjectKey = { [key: OIKAHMStringKey]: OIKAHMStringKey };
type OIKAHMKey = OIKAHMStringKey | OIKAHMArrayKey | OIKAHMObjectKey;
type HashMap = { [key: OIKAHMStringKey]: any };
type HashAlgorithm = "sha256" | "murmur";

class OIKAHM {
  private _hash_map: HashMap = {};
  private _hash_algorithm: HashAlgorithm;
  private _seed: number;
  constructor(algorithm: HashAlgorithm = "sha256", seed: number = 2314) {
    this._hash_algorithm = algorithm;
    this._seed = seed;
  }
  set(key: OIKAHMKey, value: any) {
    this._hash_map[this.hashKey(key)] = value;
  }
  get(key: OIKAHMKey) {
    return this._hash_map[this.hashKey(key)];
  }
  private hashKey(multiKey: OIKAHMKey): string {
    if (this.isArrayKey(multiKey)) {
      multiKey = this.arrayKeyToStringKey(multiKey as OIKAHMArrayKey);
    } else if (this.isObjectKey(multiKey)) {
      multiKey = this.objectKeyToStringKey(multiKey as OIKAHMObjectKey);
    }
    if (this._hash_algorithm === "murmur") {
      return murmur3(multiKey as string, this._seed).toString();
    } else {
      return hmacsha256(multiKey as string, this._seed.toString()).toString(
        hex,
      );
    }
  }
  private arrayKeyToStringKey(key: OIKAHMArrayKey): OIKAHMStringKey {
    return `array:${join(sortBy(key as OIKAHMArrayKey), "")}`;
  }
  private objectKeyToStringKey(key: OIKAHMObjectKey): OIKAHMStringKey {
    return `object:${join(sortBy(map(key, (objectValue, objectKey) => objectKey + objectValue) as OIKAHMArrayKey), "")}`;
  }
  private isArrayKey(key: OIKAHMKey): boolean {
    return isArray(key) && every(map(key, (key) => isString(key)));
  }
  private isObjectKey(key: OIKAHMKey): boolean {
    return (
      isObject(key) &&
      every(map(keys(key), (key) => isString(key))) &&
      every(map(values(key), (key) => isString(key)))
    );
  }
}

export default OIKAHM;
export { type OIKAHMKey, type HashAlgorithm };
