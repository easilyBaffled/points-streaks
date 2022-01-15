import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import React from "react";
import { connect } from "react-redux";
import { selectors } from "../store";
import { selectors as bankSelectors } from "@/features/bank";
import { purchaseReward } from "@/state/actions/purchaseReward";

export { AddRewardInput } from "./addRewardInput";

export function _RewardsList({ rewards, notEnoughPoints, purchase }) {
    return rewards.map( ({ reward, id, value }) => {
        return (
            <div key={id}>
                <ReactMarkdown className={clsx( "name" )}>{reward}</ReactMarkdown>
                <code className="value">{value}</code>
                <button
                    onClick={() => purchase( value, id )}
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
            .filter( ( r ) => !selectors.hasBeenPurchased( state, r.id ) )
    }),
    ( dispatch ) => ({
        purchase: ( amount, id ) => dispatch( purchaseReward({ amount, id }) )
    })
)( _RewardsList );
