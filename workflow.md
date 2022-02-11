# Workflow

Developer Creates:
```
public function add(int a) {
    return a + 2;
}
```

LC Creates:
```
// Real world usage
main() {
    function add(input1)
}

public function add(int a) {
    int returnVal = add.v1(a);

    record({ 
        params: {
            a: a
        },
        function: add.v1,
        result: returnVal
    });

    return returnVal;
}

private function add.v1(int a) {
    return a + 2;
}
```

Users run:
```
add(1) // 3
add(4) // 6
add(20) // 22

```

LC Records
```
add.v1: 1 = 3
add.v1: 4 = 6
add.v1: 20 = 22
```

Developer Updates:
```
public function add(int a, int b) {
    return a + b;
}
```

LC Creates
```
public function add(int a) {
    return add.v1(a);
}

public function add(int a, int b) {
    return add.v2(a, b);
}

private function add.v1(int a) {
    return a + 2;
}

private function add.v2(int a, int b) {
    return a + b;
}
```

LC Tests New Path with existing known inputs/outputs and doesn't remove old reference.
```
assert(add.v2(1) == 3) // false
assert(add.v2(1) == 3) // false
assert(add.v2(1) == 3) // false
```

Developer updates 
```
// Real world usage
main() {
    function add(input1, input2)
}
```