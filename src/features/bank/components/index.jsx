import { connect } from "react-redux";
import { selectors, specialWorthCalculators } from "../store";

export const _Bank = ({ special, points }) => {
    return (
        <main id="bank">
            <h1>Bank</h1>
            <h3>{points}</h3>
            {Object.entries( special ).map( ([ name, amount ]) => (
                <h3>
                    {name}:{" "}
                    {Math.round( specialWorthCalculators[ name ]( points ) * amount )}
                </h3>
            ) )}
        </main>
    );
};

export const Bank = connect( selectors.getBank )( _Bank );
