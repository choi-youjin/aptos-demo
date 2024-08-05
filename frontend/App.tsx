import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
// Internal pages
import { Mint } from "@/pages/Mint";
import { CreateFungibleAsset } from "@/pages/CreateFungibleAsset";
import { MyFungibleAssets } from "@/pages/MyFungibleAssets";
import AppHeader from "@/components/AppHeader";
import AppFooter from "./components/AppFooter";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <AppHeader className="fixed inset-x-0 top-0 w-full" />
      <Outlet />
      <AppFooter className="mt-40" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Mint />,
      },
      {
        path: "create-asset",
        element: <CreateFungibleAsset />,
      },
      {
        path: "my-assets",
        element: <MyFungibleAssets />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
