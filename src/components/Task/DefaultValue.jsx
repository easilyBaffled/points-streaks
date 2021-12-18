import React from "react";

export const DefaultValue = ({ value, children }) => (
    <code className="value">{children ?? value}</code>
);
