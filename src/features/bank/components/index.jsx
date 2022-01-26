import { connect } from "react-redux";
import { TicketIcon } from "@heroicons/react/solid";
import { selectors } from "../store";
import { AdjustValueInput } from "./adjustValueInput";
import { ConvertSpecialInput } from "./convertSpecialToPointsInput";

const nameIconMap = {
    pizza: "🍕"
};

export const _Bank = ({ special, points }) => {
    return (
        <>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <TicketIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    {points}
                    <AdjustValueInput />
                </div>
                {Object.entries( special ).map( ([ name, amount ]) => (
                    <div
                        key={name}
                        className="mt-2 flex items-center text-sm text-gray-500"
                    >
                        <p className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                            {" "}
                            {nameIconMap[ name ] ?? name}
                        </p>
                        {amount}
                        <ConvertSpecialInput maximum={amount} type={name} />
                    </div>
                ) )}
            </div>
        </>
    );
};

export const Bank = connect( selectors.getBank )( _Bank );
