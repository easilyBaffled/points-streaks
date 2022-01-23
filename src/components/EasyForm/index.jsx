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

export const EasyForm = ({ children, showSubmit }) => {
    const submitters = React.Children.toArray( children ).map( ( el ) => {
        const { onSubmit, name } = el?.props ?? {};

        return { name, onSubmit };
    });

    return (
        <form onSubmit={buildSubmitHandler( submitters )}>
            {children}
            <input
                type="submit"
                style={{ display: showSubmit ? "initial" : "none" }}
            />
        </form>
    );
};
