import React, { useEffect } from 'react';  
import { connect } from 'react-redux';

import Loader from '@material-ui/core/CircularProgress';
import Position from './Position';
import { positionsGet, p_reset } from '../../../../../redux/actions/position';



const PositionsGet = ({match, positionsGet, reset, positions = [], loading = true, onOpen}) => {
    const id = match.params.id
    useEffect(function getPositions() {
        (async () => {
            if(id) await positionsGet(id)
        }) ()
        return () => reset()
    }, [id, positionsGet, reset])

    return (
        <>
            {
                loading
                ? <div className="row"><div className="col s12 center-align"><Loader color='secondary'/></div></div>
                : positions.length && !loading
                    ? (
                        <table className="highlight">
                            <thead>
                            <tr>
                                <th>Название</th>
                                <th>Стоимость</th>
                                <th>Количество</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    positions.map((item, i) => {
                                        const key = `${i}${Math.floor(Math.random() * 1000)}` 
                                        return (
                                            <Position position={item} key={key} onOpen={onOpen}/>
                                        )
                                    })
                                
                                }
                            </tbody>
                        </table>
                    )
                    : <div className="row"><div className="col s12 center-align"><span className="center-align">Позиции категории пусты.</span></div></div>
            }
        </>
    )
}

function mSTP(state) {
    return {
        positions: state.position?.positions,
        loading: state.position?.loading,
    }
}
function mDTP(dispatch) {
    return {
        positionsGet: id => dispatch(positionsGet(id)),
        reset: position => dispatch(p_reset(position))
    }
}
export default connect(mSTP, mDTP)(PositionsGet)
