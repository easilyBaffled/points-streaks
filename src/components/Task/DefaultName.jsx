import clsx from "clsx";
import React from "react";

export const DefaultName = ({ task, children, isDone }) => (
    <h3 className={clsx("name", { done: isDone })}>{children ?? task}</h3>
);
