import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { UserControl } from "../userControl.jsx";

// isActive would be unaccessable without this component
const DisclosureNavLink = ({ children, ...props }) => (
    <NavLink
        {...props}
        className={({ isActive }) =>
            clsx(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
            )
        }
    >
        {children}
    </NavLink>
);

export const NavMobileView = ({ user, userNavigation, routes }) => (
    <Disclosure.Panel className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map( ( route ) => (
                <Disclosure.Button
                    as={DisclosureNavLink}
                    to={route}
                    key={route}
                >
                    {route.toUpperCase()}
                </Disclosure.Button>
            ) )}
        </div>
        <UserControl user={user} userNavigation={userNavigation} />
    </Disclosure.Panel>
);
