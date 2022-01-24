import { useLocation } from "react-router-dom";
import {
    BriefcaseIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    LocationMarkerIcon
} from "@heroicons/react/solid";
import { ResolveDayButton } from "@/features/actionHeader";
import { Bank } from "@/features/bank";

function classNames( ...classes ) {
    return classes.filter( Boolean ).join( " " );
}

export const ContentHeader = () => {
    let { pathname } = useLocation();
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            {pathname.replace( /\/(\w)/, ( __, $1 ) =>
                                $1.toUpperCase()
                            )}
                        </h2>
                        <Bank />
                    </div>
                    <div className="mt-5 flex lg:mt-0 lg:ml-4">
                        <span className="sm:ml-3">
                            <ResolveDayButton />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
//
// export const ContentHeader = () => {
//     let { pathname } = useLocation();
//     console.tap( location );
//     return (
//         <header className="bg-white shadow">
//             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                     {pathname.replace( /\/(\w)/, ( __, $1 ) => $1.toUpperCase() )}
//                 </h1>
//             </div>
//         </header>
//     );
// };
