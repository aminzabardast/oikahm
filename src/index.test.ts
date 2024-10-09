import OIKAHM, { type OIKAHMKey } from "./index";

describe("Generally, OIKAHM", () => {
  let hashMap: InstanceType<typeof OIKAHM>;

  beforeEach(() => {
    hashMap = new OIKAHM();
  });

  it("should return `undefined` for any key by default.", () => {
    const key: OIKAHMKey = "testKey";
    expect(hashMap.get(key)).toBeUndefined();
  });
  it("should return the correct value assigned for it.", () => {
    const key: OIKAHMKey = "testKey";
    hashMap.set(key, 1);
    hashMap.set(key, 2);
    expect(hashMap.get(key)).not.toBe(1);
    expect(hashMap.get(key)).toBe(2);
  });
  it("should accept `string` as a key.", () => {
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
});
describe("OIKAHM with `array` key", () => {
  it.todo("should be Order-Invariant.");
});
describe("OIKAHM with `object` key", () => {
  it.todo("should be Order-Invariant.");
});
describe("OIKAHM with `array` and - a similar - `object` keys", () => {
  it.todo("should be Order-Invariant ,and Key-Agnostic, and not mix up both.");
});
