import { NavLink } from "react-router-dom";

export function NavTabs({ routes }) {
    return (
        <span>
            {routes.map((route) => (
                <NavLink
                    key={route}
                    to={route}
                    className={({ isActive }) =>
                        `task-list-link ${isActive ? "active" : ""}`
                    }
                >
                    {route.toUpperCase()}
                </NavLink>
            ))}
        </span>
    );
}
