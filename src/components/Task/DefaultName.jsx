import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";

function LinkRenderer( props ) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
}

export const DefaultName = ({ task, children, isDone }) => (
    <ReactMarkdown
        components={{ a: LinkRenderer }}
        className={clsx( "name", { done: isDone })}
    >
        {children ?? task}
    </ReactMarkdown>
);
