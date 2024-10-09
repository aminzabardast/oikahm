# Order-Invariant Key-Agnostic Hash Map (OIKAHM)

## Overview

OIKAHM is a JavaScript implementation of a flexible and efficient hash map that supports order-invariant, composite keys. Unlike traditional hash maps that depend on a single key or the order of elements in multi-part keys, OIKAHM allows you to use complex keys, such as arrays or objects, without worrying about their order. This makes it an ideal choice for scenarios where key order should not affect lookups, ensuring consistent and predictable behavior.

## Features

- Order Invariance: Keys can be passed in any order, and OIKAHM will treat them as equivalent.
- Key Agnosticism: Supports various key structures, including arrays (`['a', 'b', 'c']`) and objects (`{a: 'AA', b: 'BB', c: 'CC'}`).
- Efficient Lookup: Provides fast access, insertion, and deletion operations for composite keys.
- Customizable Hashing: Uses a default hashing mechanism but can be extended with custom hash functions to fit specific use cases.

## License

This project is licensed under the MIT License.
