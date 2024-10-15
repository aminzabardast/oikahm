# Order-Invariant Key-Agnostic Hash Map (OIKAHM)

## Overview

OIKAHM is a JavaScript implementation of a flexible and efficient hash map that supports order-invariant, composite keys. Unlike traditional hash maps that depend on a single key or the order of elements in multi-part keys, OIKAHM allows you to use complex keys, such as arrays or objects, without worrying about their order. This makes it an ideal choice for scenarios where key order should not affect lookups, ensuring consistent and predictable behavior.

## Features

- Order Invariance: Keys can be passed in any order, and OIKAHM will treat them as equivalent.
- Key Agnosticism: Supports various key structures, including arrays (`['a', 'b', 'c']`) and objects (`{a: 'AA', b: 'BB', c: 'CC'}`).
- Efficient Lookup: Provides fast access, insertion, and deletion operations for composite keys.
- Customizable Hashing: Uses a default hashing mechanism but can be extended with custom hash functions to fit specific use cases.

## Installation

Install OIKAHM using NPM or PNPM:

```shell
npm add oikahm
# or
pnpm add oikahm
```

```js
import { default as HashMap } from "oikahm";
const hashMap = new HashMap();
// String Key
hashMap.set("A Key", 2314);
console.log(hashMap.get("A Key")); // $ > 2314
console.log(hashMap.get("Another Key")); // $ > undefined
```

```js
import { default as HashMap } from "oikahm";
const hashMap = new HashMap();
// Array Key
hashMap.set(["Key 1", "Key 2"], 2314);
// Order-Invariant Access
console.log(hashMap.get(["Key 1", "Key 2"])); // $ > 2314
console.log(hashMap.get(["Key 2", "Key 1"])); // $ > 2314
console.log(hashMap.get(["Key 1", "Key 2", "Key 3"])); // $ > undefined
```

```js
import { default as HashMap } from "oikahm";
const hashMap = new HashMap();
// Object Key
hashMap.set({ key1: "val1", key2: "val2" }, 2314);
// Order-Invariant Access
console.log(hashMap.get({ key1: "val1", key2: "val2" })); // $ > 2314
console.log(hashMap.get({ key2: "val2", key1: "val1" })); // $ > 2314
console.log(hashMap.get({ key1: "val1", key2: "val2", key3: "val3" })); // $ > undefined
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License.
