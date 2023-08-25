import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import AddProduct from "./pages/add";
import EditProduct from "./pages/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/update/:id",
    element: <EditProduct />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
