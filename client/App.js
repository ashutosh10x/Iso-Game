import React from "react";
import { LoginAuthRedirector } from "./hoc/redirector";

class App extends React.Component {
  render() {
    return (
      <div>
       <h1>Hello World!</h1>
      </div>
    )
  }
}

// function App(props) {
//   return (
//     <div>
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

export default LoginAuthRedirector(App);
