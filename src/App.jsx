import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { selectors } from "./state";
function App({ tasks }) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <pre>
        <code>{JSON.stringify(tasks, null, 4)}</code>
      </pre>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}
//const mapStateToProps = (state) => ({ todos: state.todos })
export default connect((state) => ({
  tasks: selectors.tasks.selectAll(state),
}))(App);

// export default App;
