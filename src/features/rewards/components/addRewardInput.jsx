import { connect } from "react-redux";
import { actions } from "@/features/rewards";
import { EasyForm } from "@/components";

const parseReward = ( rewardString ) => {
    return rewardString.match( /(?<reward>.*): (?<value>\d+)$/ )?.groups ?? {};
};

export const _AddRewardInput = ({ createReward }) => (
    <EasyForm>
        <input name="reward" onSubmit={createReward} />
    </EasyForm>
);
export const AddRewardInput = connect( null, ( dispatch ) => ({
    createReward: ( rewardStr ) => {
        const { reward, value } = parseReward( rewardStr );
        dispatch(
            actions.createReward({
                reward,
                value
            })
        );
    }
}) )( _AddRewardInput );
