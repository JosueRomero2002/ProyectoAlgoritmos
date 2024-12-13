import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import TSPMap from "../components/map";

import TSPSimulator from "../pages/TSPSimulator";
import Knapsack from "../pages/Knapsack";
import SubsetSumApp from "../pages/Subset/SubsetSumApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Router>
          <Navbar>
            <Routes>
              <Route path="/" element={<TSPSimulator />} />
              <Route path="/tspsimulator" element={<TSPSimulator />} />
              <Route path="/knapsack" element={<Knapsack />} />
              <Route path="/subsetsumapp" element={<SubsetSumApp />} />
            </Routes>
          </Navbar>
        </Router>
      </div>

      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;

// import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import TSPSimulator from "../pages/TSPSimulator";
// import Knapsack from "../pages/Knapsack";
// import SubsetSumApp from "../pages/Subset/SubsetSumApp";

// // import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// // import TSPMap from "../components/map";

// // import TSPSimulator from "../pages/TSPSimulator";
// // import Knapsack from "../pages/Knapsack";
// // import SubsetSumApp from "../pages/Subset/SubsetSumApp";

// function App() {
//   return (
//     <>
//       <Router>
//         <div>
//           {" "}
//           {/* Espacio para el navbar fijo */}
//           <Routes>
//             <Route path="/" element={<TSPSimulator />} />
//             <Route path="/tspsimulator" element={<TSPSimulator />} />
//             <Route path="/knapsack" element={<Knapsack />} />
//             <Route path="/subsetsumapp" element={<SubsetSumApp />} />
//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;
