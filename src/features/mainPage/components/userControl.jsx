import { BellIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";

export const UserControl = ({ userNavigation, user }) => (
    <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex justify-around	py-3 px-2">
            <Disclosure.Button
                className="block px-6 py-4 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => {
                    window.points.syncFromHistory();
                }}
            >
                Pull from History
            </Disclosure.Button>
            <Disclosure.Button
                className="block px-6 py-4 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => {
                    console.tap( "test" );
                    // window.points.syncToHistory();
                }}
            >
                Push to History
            </Disclosure.Button>
        </div>
    </div>
);
