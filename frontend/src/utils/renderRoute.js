import ProtectedRoute from "../components/ProtectedRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

export const renderRoutes = (routes) =>
    routes.map((route, index) => {
        if (route.children) {
            return {
                ...route,
                children: renderRoutes(route.children),
            };
        }

        if (!route.isPublic && route.requiredRole) {
            return {
                ...route,
                element: (
                    <ProtectedRoute>
                        <RoleBasedRoute requiredRole={route.requiredRole}>
                            {route.element}
                        </RoleBasedRoute>
                    </ProtectedRoute>
                ),
            };
        }

        if (!route.isPublic) {
            return {
                ...route,
                element: (
                    <ProtectedRoute>
                        {route.element}
                    </ProtectedRoute>
                ),
            };
        }

        return route;
    });
