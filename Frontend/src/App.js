import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PasswordForm from "./pages/PasswordForm";
import TeamPoints from "./pages/TeamPoints";
import Trading from "./pages/Trading";
import RootLayout from "./pages/Root";

// the variable has to be stored in a constant
const router = createBrowserRouter([
  {
    // Create Root page to act as a wrapper
    //For more complicated pages multiple root routes
    // can be created for different paths
    path: "/",
    element: <RootLayout />,
    children: [
      // Define path on which this path should be active
      // Path is following after .com like /login
      // Also define which component should be loaded with element.
      // For that add folder pages, but you can use whatever name
      // you like for the folder
      { path: "/", element: <PasswordForm /> },
      { path: "/komandas", element: <TeamPoints /> },
      { path: "/tirdzins", element: <Trading /> },
    ],
  },
]);

function App() {
  // Pass in the createBrowserRouter values constant
  // into RouterProvider so that for the defined path
  // defined element would be returned
  return <RouterProvider router={router} />;
}

export default App;
