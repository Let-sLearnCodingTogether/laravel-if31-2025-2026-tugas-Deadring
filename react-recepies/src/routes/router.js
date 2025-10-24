import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: {
            Component: async () => {
                const component = await import("../pages/recepies/recepies")

                return component.default
            }
        }
    },
    {
        path: "/new-recepies",
        lazy: {
            Component: async () => {
                const component = await import("../pages/recepies/createRecepies")

                return component.default
            }
        }
    },
    {
        path: "/update-recepies/:id",
        lazy: {
            Component: async () => {
                const component = await import("../pages/recepies/updateRecepies")

                return component.default
            }
        }
    },
]);

export default router;