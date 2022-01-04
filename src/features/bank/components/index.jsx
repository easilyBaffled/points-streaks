import { connect } from "react-redux";
import { selectors, specialWorthCalculators } from "../store";
import { AdjustValueInput } from "@/features/bank/components/adjustValueInput";

export const _Bank = ({ special, points }) => {
    return (
        <main id="bank">
            <h3>points:</h3>

            <h3>{points}</h3>
            <AdjustValueInput />
            {Object.entries( special ).map( ([ name, amount ]) => (
                <>
                    <h3>
                        {name}:</h3>
                    <h3>
                        {amount}
						( worth: {Math.round( specialWorthCalculators[ name ]( points ) * amount )})
                    </h3>
                </>
            ) )}
        </main>
    );
};

export const Bank = connect( selectors.getBank )( _Bank );
