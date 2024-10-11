import { murmur3 } from "murmurhash-js";
import hmacsha256 from "crypto-js/hmac-sha256";
import hex from "crypto-js/enc-hex";
import isString from "lodash.isstring";
import isArray from "lodash.isarray";
import map from "lodash.map";
import every from "lodash.every";
import sortBy from "lodash.sortby";
import join from "lodash.join";

type OIKAHMStringKey = string;
type OIKAHMArrayKey = string[];
type OIKAHMKey = OIKAHMStringKey | OIKAHMArrayKey;
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
      multiKey = this.keyToStringKey(multiKey);
    }
    if (this._hash_algorithm === "murmur") {
      return murmur3(multiKey as string, this._seed).toString();
    } else {
      return hmacsha256(multiKey as string, this._seed.toString()).toString(
        hex,
      );
    }
  }
  private keyToStringKey(key: OIKAHMKey): OIKAHMStringKey {
    return `string:${join(sortBy(key), "")}`;
  }
  private isArrayKey(key: OIKAHMKey): boolean {
    return isArray(key) && every(map(key, (key) => isString(key)));
  }
}

export default OIKAHM;
export { type OIKAHMKey, type HashAlgorithm };
