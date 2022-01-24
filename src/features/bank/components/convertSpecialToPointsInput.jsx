import { connect } from "react-redux";
import React from "react";
import { actions } from "../store";
import { EasyForm } from "@/components";

export const _ConvertSpecialInput = ({ convertSpecial, type, maximum }) => (
    <EasyForm>
        <input
            id={`${type}-conversion-input`}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-16 pl-3 sm:text-sm border-2 border-gray-300 rounded-md"
            type="number"
            name={`${type}-conversion-input`}
            max={maximum}
            min={0}
            onSubmit={( v ) => convertSpecial( Number( v ) )}
        />
    </EasyForm>
);

export const ConvertSpecialInput = connect( null, ( dispatch ) => ({
    convertSpecial: ( amount, type ) =>
        dispatch( actions.convertSpecial({ amount, type }) )
}) )( _ConvertSpecialInput );
