import Game from "./components/Game";
import Player from "./components/player/Player";
import styles from "./App.module.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Game />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ])

  return (
    <div className={styles.canvas}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
