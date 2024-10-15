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

type HashMap = { [key: string]: any };
type HashAlgorithm = "sha256" | "murmur";

/**
 * Main implementation of the OIKAHM (Order-Invariant Key-Agnostic Hash Map)
 * @example
 * const hm = OIKAHM();
 * hm.set("key", "value");
 * console.log(hm.get("key"));
 * @example
 * const hm = OIKAHM(algorithm="murmur");
 * hm.set("key", "value");
 * console.log(hm.get("key"));
 * @example
 * const hm = OIKAHM(seed=148);
 * hm.set("key", "value");
 * console.log(hm.get("key"));
 */
class OIKAHM {
  private _hash_map: HashMap = {};
  private _hash_algorithm: HashAlgorithm;
  private _seed: number;
  constructor(algorithm: HashAlgorithm = "sha256", seed: number = 2314) {
    this._hash_algorithm = algorithm;
    this._seed = seed;
  }
  /**
   * Setter Function
   * @param {OIKAHMKey} key - The key that receives the value.
   * @param {any} value The value we want to set for the key.
   */
  set(key: OIKAHMKey, value: any) {
    this._hash_map[this.hashedKey(key)] = value;
  }
  /**
   * Getter Function
   * @param {OIKAHMKey} key - The reference key.
   * @returns {void}
   */
  get(key: OIKAHMKey): void {
    return this._hash_map[this.hashedKey(key)];
  }
  /**
   * The method that takes the key and returns a hashed value.
   * @param {OIKAHMKey} multiKey - The key used in the hash table.
   * @returns {string} Hashed String used for mapping.
   */
  private hashedKey(multiKey: OIKAHMKey): string {
    if (this.isArrayKey(multiKey)) {
      multiKey = this.arrayKeyToStringKey(multiKey as OIKAHMArrayKey);
    } else if (this.isObjectKey(multiKey)) {
      multiKey = this.objectKeyToStringKey(multiKey as OIKAHMObjectKey);
    } else {
      /**
       * Explicitly marking string as a string key to make sure we avoid the same keys.
       * For example,`["A", "B"]` will be `array:AB`. But we should not be able to explicitly set the key
       *   to `array:AB`. If we do that, then `array:AB` will be `string:array:AB`, which makes it unique
       *   and different.
       */
      multiKey = `string:${multiKey}`;
    }
    // Here is the hashing process
    if (this._hash_algorithm === "murmur") {
      return murmur3(multiKey as string, this._seed).toString();
    } else {
      return hmacsha256(multiKey as string, this._seed.toString()).toString(
        hex,
      );
    }
  }
  /**
   * ABC
   * @param {OIKAHMArrayKey} key - None String Key.
   * @returns {OIKAHMStringKey} String Key to be hashed.
   */
  private arrayKeyToStringKey(key: OIKAHMArrayKey): OIKAHMStringKey {
    return `array:${join(sortBy(key as OIKAHMArrayKey), "")}`;
  }
  /**
   * ABC
   * @param {OIKAHMObjectKey} key - None String Key.
   * @returns {OIKAHMStringKey} String Key to be hashed.
   */
  private objectKeyToStringKey(key: OIKAHMObjectKey): OIKAHMStringKey {
    return `object:${join(sortBy(map(key, (objectValue, objectKey) => objectKey + objectValue) as OIKAHMArrayKey), "")}`;
  }
  /**
   * Is key an array?
   * @param {OIKAHMKey} key - The key to be checked against Array criteria.
   * @returns {boolean} Is key an array?
   */
  private isArrayKey(key: OIKAHMKey): boolean {
    return isArray(key) && every(map(key, (key) => isString(key)));
  }
  /**
   * Is key an object?
   * @param {OIKAHMKey} key - The key to be checked against Object criteria.
   * @returns {boolean} Is key an object?
   */
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
