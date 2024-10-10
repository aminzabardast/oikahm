import OIKAHM, { type OIKAHMKey, type HashAlgorithm } from "../src/index";

describe("Generally, OIKAHM", () => {
  it("should return `undefined` for any key by default.", () => {
    const hashMap = new OIKAHM();
    const key: OIKAHMKey = "testKey";
    expect(hashMap.get(key)).toBeUndefined();
  });
  it("should return the correct value assigned for it.", () => {
    const hashMap = new OIKAHM();
    const key: OIKAHMKey = "testKey";
    hashMap.set(key, 1);
    hashMap.set(key, 2);
    expect(hashMap.get(key)).not.toBe(1);
    expect(hashMap.get(key)).toBe(2);
  });
  it("should accept `string` as a key.", () => {
    const hashMap = new OIKAHM();
    const key: OIKAHMKey = "testKey";
    hashMap.set(key, 1);
    expect(hashMap.get(key)).toBe(1);
  });
  it.todo("should accept `int` as a key.");
  it.todo("should accept `array` as a key.");
  it.todo("should accept `object` as a key.");
  it.todo(
    "should be Key-Agnostic (accepting `string`, `int`, `array`, and `object` in the same hash mapping).",
  );
  it("should work with `murmur` and `sha256` hashes.", () => {
    const key: OIKAHMKey = "testKey";

    const hashMapMurmur = new OIKAHM("murmur");
    hashMapMurmur.set(key, 1);
    hashMapMurmur.set(key, 2);
    expect(hashMapMurmur.get(key)).not.toBe(1);
    expect(hashMapMurmur.get(key)).toBe(2);

    const hashMapSha = new OIKAHM("sha256");
    hashMapSha.set(key, 1);
    hashMapSha.set(key, 2);
    expect(hashMapSha.get(key)).not.toBe(1);
    expect(hashMapSha.get(key)).toBe(2);
  });
});
describe("OIKAHM with `array` key", () => {
  it.todo("should be Order-Invariant.");
});
describe("OIKAHM with `object` key", () => {
  it.todo("should be Order-Invariant.");
});
describe("OIKAHM with both `array` and - a similar - `object` keys", () => {
  it.todo("should be Order-Invariant and Key-Agnostic (and not mix them up).");
});
