import Game from "./components/Game";
import styles from "./App.module.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Stats from "./components/stats/Stats";
import useAxiosPrivate from "./config/useAxiosPrivate";

function App() {

  const axiosPrivate = useAxiosPrivate();

  // load stats for profile
  const statsLoader = async () => {
    const statsRes = await axiosPrivate.get('user/stats');
    return statsRes.data; 
  }

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
    {
      path: "stats",
      element: <Stats />,
      loader: statsLoader,
    },
  ])

  return (
    <div className={styles.canvas}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

