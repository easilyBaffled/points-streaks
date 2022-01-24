import { useLocation } from "react-router-dom";

export const ContentHeader = () => {
    let { pathname } = useLocation();
    console.tap( location );
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {pathname.replace( /\/(\w)/, ( __, $1 ) => $1.toUpperCase() )}
                </h1>
            </div>
        </header>
    );
};
