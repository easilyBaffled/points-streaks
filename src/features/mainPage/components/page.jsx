/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { Main } from "./main.jsx";
import { ContentHeader } from "./contentHeader.jsx";
import { UserControl } from "./userControl.jsx";
import { NavMobileView } from "./nav/mobileView.jsx";
import { NavFullView } from "./nav/fullView.jsx";
import { Logo } from "./logo.jsx";
import { UserProfileDropdown } from "./userProfileDropdown.jsx";
import { MobileMenuButton } from "./MobileMenuButton.jsx";

const user = {
    email:    "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Tom Cook"
};
const navigation = [
    { current: true, href: "#", name: "Dashboard" },
    { current: false, href: "#", name: "Team" },
    { current: false, href: "#", name: "Projects" },
    { current: false, href: "#", name: "Calendar" },
    { current: false, href: "#", name: "Reports" }
];
const userNavigation = [
    { href: "#", name: "Your Profile" },
    { href: "#", name: "Settings" },
    { href: "#", name: "Sign out" }
];

function classNames( ...classes ) {
    return classes.filter( Boolean ).join( " " );
}

export default function Example() {
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <Logo />
                                        <NavFullView
                                            navigation={navigation}
                                            classNames={classNames}
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {/* Profile dropdown */}
                                            <UserProfileDropdown
                                                user={user}
                                                userNavigation={userNavigation}
                                                classNames={classNames}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <MobileMenuButton open={open} />
                                    </div>
                                </div>
                            </div>
                            <NavMobileView />
                        </>
                    )}
                </Disclosure>

                <ContentHeader />
                <Main />
            </div>
        </>
    );
}
