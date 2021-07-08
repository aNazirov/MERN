import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Position from './Position';
import Loader from '@material-ui/core/CircularProgress';
import { positionsGet } from '../../../../../../../redux/actions/position';

const PositionsGet = ({id = '', positionsGet, positions = [], loading = true, update = false, onOpen}) => {
    useEffect(function getPositions() {
        (async () => {
            if(id) await positionsGet(id)
        }) ()
    }, [id, positionsGet, update])

    return (
        <>
            {
                loading
                ? <Loader color="secondary"/>
                : positions.length && !loading
                    ? (
                        <div className="collection left-align">
                            {
                                positions.map( (item, i) => {
                                    const key = `${i}${Math.floor(Math.random() * 1000)}` 
                                    return (
                                        <Position position={item} key={key} onOpen={onOpen}/>
                                    )
                                })
                            
                            }
                        </div>
                    )
                    : <span className="center-align">Позиции категории пусты.</span>
                }
        </>
    )
}
function mSTP(state) {
    return {
        id: state.category?.category?._id,
        positions: state.position?.positions,
        update: state.position?.update,
        loading: state.position?.loading,
    }
}
function mDTP(dispatch) {
    return {
        positionsGet: id => dispatch(positionsGet(id))
    }
}
export default connect(mSTP, mDTP)(PositionsGet)
