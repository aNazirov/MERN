import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css'

import Modal from './Modal';
import PositionsGet from './PositionsGet/PositionsGet';
import { connect } from 'react-redux';
import { set_position, p_reset } from '../../../../../../redux/actions/position';

const Positions = ({setPosition, reset}) => {
    const modalRef = useRef(null)
    const [modal, setModal] = useState(null)

    const addPosition = () => {
        onOpen()
    }
    const onCancel = () => modal?.close()
    const onOpen = () => modal?.open()
    useEffect(function initModal() {
        if(!modal) {
            const instance = M.Modal.init(modalRef.current, {onCloseEnd: () => {setPosition({})}})
            setModal(instance)
        }
        return () => {
            modal?.destroy()
            reset()
        }
    }, [modal, setPosition, reset])
    return (
        <>
            <div className="row">
                <div className="col s12">
                    <div className="page-subtitle">
                        <h4>Позиции:</h4>
                        <button 
                            className="waves-effect waves-light btn grey darken-1 btn-small"
                            onClick={addPosition}
                        >
                            Добавить позицию
                        </button>
                    </div>
                    <div className="center-align">
                        <PositionsGet onOpen={onOpen}/>
                    </div>
                </div>
            </div>
            <Modal
                innerRef={modalRef}
                cancel={onCancel}
            /> 
        </>
    )
}

function mDTP(dispatch) {
    return {
        setPosition: position => dispatch(set_position(position)),
        reset: position => dispatch(p_reset(position))
    }
}
export default connect(null, mDTP)(Positions)
