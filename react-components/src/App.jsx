import React, { Component } from "react";

// Functional Component
function FunctionalComponent() {
  return (
    <div>
      <h2>Functional Component</h2>
      <p>This is a Functional Component.</p>
    </div>
  );
}

// Class Component
class ClassComponent extends Component {
  render() {
    return (
      <div>
        <h2>Class Component</h2>
        <p>This is a Class Component.</p>
      </div>
    );
  }
}

// Main App Component
function App() {
  return (
    <div>
      <h1>React Components</h1>

      <FunctionalComponent />

      <ClassComponent />
    </div>
  );
}

export default App;