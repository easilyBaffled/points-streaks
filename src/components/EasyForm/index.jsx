import React from "react";

function buildSubmitHandler( submitters ) {
    return function handleFormSubmission( e ) {
        e.preventDefault();
        submitters.forEach( ({ name, onSubmit }) => {
            onSubmit( e.target.elements[ name ].value, e );
        });
        e.target.reset();
    };
}

export const EasyForm = ({ className = "", children, showSubmit }) => {
    const submitters = React.Children.toArray( children ).map( ( el ) => {
        const { onSubmit, name } = el?.props ?? {};

        return { name, onSubmit };
    });

    return (
        <form
            className={
                "gap-3 flex flex-row items-center justify-around p-3" +
                className
            }
            onSubmit={buildSubmitHandler( submitters )}
        >
            {children}
            <input
                className="focus:ring-indigo-500 focus:border-indigo-500 pl-3 sm:text-sm border-2 border-gray-300 rounded-md"
                type="submit"
                style={{ display: showSubmit ? "initial" : "none" }}
            />
        </form>
    );
};
