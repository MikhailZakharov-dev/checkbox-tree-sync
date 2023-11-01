# CheckboxTreeSync Library

CheckboxTreeSync is a zero dependency lightweight library designed for TypeScript projects, and it offers the following features:

- Simplifies the management of hierarchical data, like trees, with unique synchronization capabilities:
  - Effortlessly pick parent and children nodes.
  - Automatically synchronize parent selections when all children are cleared.
  
- Framework-agnostic: Use it seamlessly in any TypeScript project, regardless of the framework.
- Headless: Provides complete control and flexibility for UI integration.

  

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Interface](#interface)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the CheckboxTreeSync library in your project, you can install it via npm or yarn.

```bash
npm install checkbox-tree-sync
```

or 

```bash
yarn add checkbox-tree-sync
```

## Usage

The CheckboxTreeSync library is headless, meaning it doesn't come with a specific UI or framework tie-ins. It's designed to be framework-agnostic and can be used in various environments, including TypeScript-based projects.

Here's a basic example of how to use it:


```javascript
import { useCheckboxTreeSync } from 'checkbox-tree-sync';

// Define your data and options
const data = // Your hierarchical data

// Create a CheckboxTreeSync instance using the adapter
const { checkBoxTreeSync } = useCheckboxTreeSync({
  data,
  state: {},
  getSubCheckboxes: (item) => // Your function to get sub-checkboxes,
  getCheckboxId: (item) => // Your function to get a checkbox's ID,
  onStateChange: (state) => // Handle state changes,
});

// Use the CheckboxTreeSync instance to manage and interact with your data
// ...
```

### Working example

- https://codesandbox.io/s/new-sky-rh72xj - vanilla css & react
- https://codesandbox.io/s/focused-water-fxkcgm - material ui

## TypeScript Support

The CheckboxTreeSync library fully supports TypeScript, providing type definitions for its core components. You can take full advantage of TypeScript's static type checking and code intelligence when using this library.


## Contributing
If you'd like to contribute to the CheckboxTreeSync library, please check the CONTRIBUTING.md file for guidelines on how to get started.
(coming soon)

## License
This project is licensed under the ISC License. See the LICENSE file for details.