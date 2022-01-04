import { connect } from "react-redux";
import React from "react";
import { actions } from "../store";
import { EasyForm } from "@/components";

export const _AdjustValueInput = ({ addPoints }) => (
    <EasyForm>
        <input
            id="bankInput"
            type="number"
            name="num"
            onSubmit={( v ) => addPoints( Number( v ) )}
        />
    </EasyForm>
);

export const AdjustValueInput = connect( null, ( dispatch ) => ({
    addPoints: ( amount ) =>
        dispatch( actions.addPoints( console.tap( amount, typeof amount ) ) )
}) )( _AdjustValueInput );
