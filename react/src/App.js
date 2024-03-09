import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PasswordForm from "./pages/PasswordForm";
import Player from "./pages/Player";
import RootLayout from "./pages/Root";
import Teams from "./pages/Teams";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <PasswordForm /> },
      { path: "/komandas", element: <Teams /> },
      { path: "/tirdzins", element: <Player /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
