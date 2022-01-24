import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const NavFullView = ({ navigation, routes, classNames }) => (
    <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
            {routes.map( ( route ) => (
                <NavLink
                    key={route}
                    to={route}
                    className={({ isActive }) =>
                        clsx(
                            "px-3 py-2 rounded-md text-sm font-medium",
                            isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        )
                    }
                >
                    {route.toUpperCase()}
                </NavLink>
            ) )}
        </div>
    </div>
);
