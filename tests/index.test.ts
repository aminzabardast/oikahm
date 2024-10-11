import OIKAHM, { type OIKAHMKey } from "../src/index";

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
  it("should accept `array` as a key.", () => {
    const hashMap = new OIKAHM();
    const key1: OIKAHMKey = ["A", "B"];
    hashMap.set(key1, 1);
    expect(hashMap.get(key1)).toBe(1);
    const key5: OIKAHMKey = ["B", "C", "A", "D"];
    expect(hashMap.get(key5)).toBeUndefined();
  });
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
  it("should have the same values for `[A, B]` and `[B, A]` (Order-Invariance).", () => {
    const hashMap = new OIKAHM();
    const key1: OIKAHMKey = ["A", "B"];
    const key2: OIKAHMKey = ["B", "A"];
    const key3: OIKAHMKey = ["A", "B", "C"];
    hashMap.set(key1, 1);
    expect(hashMap.get(key1)).toBe(1);
    expect(hashMap.get(key2)).toBe(1);
    expect(hashMap.get(key3)).toBeUndefined();
  });
  it("should have the same values for `[A, B, C]`, `[A, C, B]`, and all other permutations (Order-Invariance).", () => {
    const hashMap = new OIKAHM();
    const key1: OIKAHMKey = ["A", "B", "C"];
    const key2: OIKAHMKey = ["A", "C", "B"];
    const key3: OIKAHMKey = ["B", "A", "C"];
    const key4: OIKAHMKey = ["B", "C", "A"];
    const key5: OIKAHMKey = ["C", "A", "B"];
    const key6: OIKAHMKey = ["C", "B", "A"];
    const key7: OIKAHMKey = ["A", "B", "C", "D"];
    hashMap.set(key1, 1);
    expect(hashMap.get(key1)).toBe(1);
    expect(hashMap.get(key2)).toBe(1);
    expect(hashMap.get(key3)).toBe(1);
    expect(hashMap.get(key4)).toBe(1);
    expect(hashMap.get(key5)).toBe(1);
    expect(hashMap.get(key6)).toBe(1);
    expect(hashMap.get(key7)).toBeUndefined();
  });
});
describe("OIKAHM with `object` key", () => {
  it.todo("should be Order-Invariant.");
});
describe("OIKAHM with both `array` and - a similar - `object` keys", () => {
  it.todo("should be Order-Invariant and Key-Agnostic (and not mix them up).");
});
describe("README Examples;", () => {
  it("Example 1 should succeed.", () => {
    const hashMap = new OIKAHM();
    hashMap.set("A Key", 2314);
    expect(hashMap.get("A Key")).toBe(2314);
    expect(hashMap.get("Another Key")).toBeUndefined();
  });
  it("Example 2 should succeed.", () => {
    const hashMap = new OIKAHM();
    hashMap.set(["Key 1", "Key 2"], 2314);
    expect(hashMap.get(["Key 1", "Key 2"])).toBe(2314);
    expect(hashMap.get(["Key 2", "Key 1"])).toBe(2314);
    expect(hashMap.get(["Key 1", "Key 2", "Key 3"])).toBeUndefined();
  });
});
