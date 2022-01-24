import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";

function LinkRenderer( props ) {
    return (
        <a
            href={props.href}
            target="_blank"
            rel="noreferrer"
            className="word-wrap"
        >
            {props.children}
        </a>
    );
}

/* ReactMarkdown creates a
	<div class={your classname here}>
		<ul>
			<li>
				<a>each</a>
				<p>paragraph</p>
				<p>and</p>
				<a>link</a>

			</li>
		</ul>
	</div>
	so flex layout and what not that you may set on the div are not necessarily
	going to hit the children you want so this li does that
 */
function NameActual({ children }) {
    return <li className="graphAndLinks">{children}</li>;
}

function NameActualP({ children }) {
    return <p className="graphAndLinks">{children}</p>;
}

export const DefaultName = ({ task, children, isDone }) => (
    <ReactMarkdown
        components={{
            a:  LinkRenderer,
            li: NameActual,
            p:  NameActualP
        }}
        className={clsx( "name", { done: isDone })}
    >
        {children ?? task}
    </ReactMarkdown>
);
