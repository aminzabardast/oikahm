import { murmur3 } from "murmurhash-js";
import hmacsha256 from "crypto-js/hmac-sha256";
import hex from "crypto-js/enc-hex";

type OIKAHMKey = string;
type HashMap = { [key: OIKAHMKey]: any };
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
  private hashKey(phrase: OIKAHMKey) {
    if (this._hash_algorithm === "murmur") {
      return murmur3(phrase, this._seed);
    } else {
      return hmacsha256(phrase, this._seed.toString()).toString(hex);
    }
  }
}

export default OIKAHM;
export { type OIKAHMKey, type HashAlgorithm };
