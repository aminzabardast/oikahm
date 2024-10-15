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
    hashMap.set(key, 1423);
    hashMap.set(key, 2314);
    expect(hashMap.get(key)).not.toBe(1423);
    expect(hashMap.get(key)).not.toBe("2314");
    expect(hashMap.get(key)).toBe(2314);
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
    const key2: OIKAHMKey = ["B", "C", "A", "D"];
    expect(hashMap.get(key2)).toBeUndefined();
  });
  it("should accept `object` as a key.", () => {
    const hashMap = new OIKAHM();
    const key: OIKAHMKey = {
      attr1: "A",
      attr2: "B",
    };
    hashMap.set(key, 1);
    expect(hashMap.get(key)).toBe(1);
  });
  it("should be Key-Agnostic (accepting `string`, `int`, `array`, and `object` in the same hash mapping).", () => {
    const hashMap = new OIKAHM();
    const keyO: OIKAHMKey = {
      attr1: "A",
      attr2: "B",
    };
    const keyA: OIKAHMKey = ["A", "B"];
    const keyS: OIKAHMKey = "AB";
    hashMap.set(keyO, 1);
    hashMap.set(keyA, 2);
    hashMap.set(keyS, 3);
    expect(hashMap.get(keyO)).toBe(1);
    expect(hashMap.get(keyA)).toBe(2);
    expect(hashMap.get(keyS)).toBe(3);
  });
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
  it("should be Order-Invariant.", () => {
    const hashMap = new OIKAHM();
    const key1: OIKAHMKey = {
      attr1: "A",
      attr2: "B",
    };
    const key2: OIKAHMKey = {
      attr2: "B",
      attr1: "A",
    };
    hashMap.set(key1, 1);
    hashMap.set(key2, 2);
    expect(hashMap.get(key1)).toBe(2);
    expect(hashMap.get(key2)).toBe(2);
  });
});
describe("OIKAHM with both `array` and - a similar - `object` keys", () => {
  it("should be Order-Invariant and Key-Agnostic (and not mix them up).", () => {
    const hashMap = new OIKAHM();

    const keyO1: OIKAHMKey = {
      attr1: "A",
      attr2: "B",
    };
    const keyO2: OIKAHMKey = {
      attr2: "B",
      attr1: "A",
    };
    const keyA1: OIKAHMKey = ["A", "B"];
    const keyA2: OIKAHMKey = ["B", "A"];
    const keyS1: OIKAHMKey = "AB";
    const keyS2: OIKAHMKey = "BA";

    hashMap.set(keyO1, 1);
    hashMap.set(keyO2, 2);
    hashMap.set(keyA1, 3);
    hashMap.set(keyA2, 4);
    hashMap.set(keyS1, 5);
    hashMap.set(keyS2, 6);

    expect(hashMap.get(keyO1)).toBe(2);
    expect(hashMap.get(keyO2)).toBe(2);
    expect(hashMap.get(keyA1)).toBe(4);
    expect(hashMap.get(keyA2)).toBe(4);
    expect(hashMap.get(keyS1)).toBe(5);
    expect(hashMap.get(keyS2)).toBe(6);
  });
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
