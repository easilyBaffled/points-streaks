import { connect } from "react-redux";
import { selectors, specialWorthCalculators } from "../store";
import { AdjustValueInput } from "@/features/bank/components/adjustValueInput";
import { ConvertSpecialInput } from "@/features/bank/components/convertSpecialToPointsInput";

export const _Bank = ({ special, points }) => {
    return (
        <main id="bank">
            <h3>points:</h3>

            <h3>{points}</h3>
            <AdjustValueInput />
            {Object.entries( special ).map( ([ name, amount ]) => (
                <span key={name}>
                    <h3>{name}:</h3>
                    <h3>
                        {amount}( worth:{" "}
                        {Math.round(
                            specialWorthCalculators[ name ]( points ) * amount
                        )}
                        )
                    </h3>
                    <ConvertSpecialInput maximum={amount} type={name} />
                </span>
            ) )}
        </main>
    );
};

export const Bank = connect( selectors.getBank )( _Bank );
