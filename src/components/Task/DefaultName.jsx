import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";

export const DefaultName = ({ task, children, isDone }) => (
    <ReactMarkdown className={clsx( "name", { done: isDone })}>
        {children ?? task}
    </ReactMarkdown>
);
