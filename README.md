# clean-architecture-poc
This is a proof of concept of Nuxt.js and Clean Architecture.

Honestly, I'm not familiar about the Clean Architecture.

How to implement it?
Which layered structures is the best? (e.g. strict layered, relaxed layered)  
Is it really useful architecture?

This PoC aims to confirm to useful of Clean Architecture.

## Features
Proof of the `./core` directory is not depends on any frameworks and drivers.

You can create and read todos in both interfaces.  
These interfaces are referencing on same codebase in `./core` directory.

### Web interface
At first, install dependencies and launch the Nuxt.js development server.
```
yarn install
yarn run dev
```

Then, You can see on http://localhost:3000

### Command line interface
**Be careful to use the cli interface.  
It's buggy.  
I just implemented for PoC.**

A few instructions are same of Web interface  
Of course, you need to install dependencies at first.
```
yarn install
```

And, Run the command line interface like this
```
yarn run cli
```
