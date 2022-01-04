import React from "react";

function buildSubmitHandler( submitters ) {
    return function handleFormSubmission( e ) {
        console.log( e );
        e.preventDefault();
        submitters.forEach( ({ name, onSubmit }) => {
            onSubmit( e.target.elements[ name ].value, e );
        });
    };
}

export const EasyForm = ({ children }) => {
    const submitters = React.Children.toArray( children ).map( ( el ) => {
        const { onSubmit, name } = el?.props ?? {};

        return { name, onSubmit };
    });

    return (
        <form onSubmit={buildSubmitHandler( submitters )}>
            {children}
            <input type="submit" style={{ display: "none" }} />
        </form>
    );
};
