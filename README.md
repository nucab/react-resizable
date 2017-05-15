## React Resize Component

A simple component that you can use to wrap your component and allows to resize its width and height.

## Installation

This module requires only React and ReactDOM to work. You don't need jQuery for this component to work.

**Simple run: **

```
yarn add react-resize-component --save
```

## Usage

```javascript
// Using ES6
import React from 'react';
import ReactDOM from 'react-dom';
import ResizeComponent from 'react-resize-component';
 
class SimpleApp extends React.Component {
  render() {
  
    // Custom CSS for ResizeBox 
    let customStyles = {
    };
    
    return (
      <ResizableBox className="my-custom-class-name" style={customStyles}>
        // Your can add your child component here
      </ResizableBox>;
    );
  }
}

export default SimpleApp;
```

## License

MIT