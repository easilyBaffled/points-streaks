import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import React from "react";
import { connect } from "react-redux";
import { selectors } from "../store";
import {
    actions as bankActions,
    selectors as bankSelectors
} from "@/features/bank";

export { AddRewardInput } from "./addRewardInput";

export function _RewardsList({ rewards, notEnoughPoints, purchase }) {
    return rewards.map( ({ reward, id, value }) => {
        return (
            <div key={id}>
                <ReactMarkdown className={clsx( "name" )}>{reward}</ReactMarkdown>
                <code className="value">{value}</code>
                <button
                    onClick={() => purchase( id )}
                    disabled={notEnoughPoints( value )}
                >
                    Purchase
                </button>
            </div>
        );
    });
}

export const RewardsList = connect(
    ( state ) => ({
        notEnoughPoints: ( amount ) =>
            bankSelectors.getPoints( state ) < Number( amount ),
        // historicalRewards: selectors
        //     .selectAll( state )
        //     .filter( ( r ) => selectors.getHistory( state )[ r ]),
        rewards: selectors
            .selectAll( state )
            .filter( ( r ) => !selectors.getHistory( state )[ r ])
    }),
    ( dispatch ) => ({
        purchase: ( amount ) => dispatch( bankActions.spendPoints( amount ) )
    })
)( _RewardsList );
