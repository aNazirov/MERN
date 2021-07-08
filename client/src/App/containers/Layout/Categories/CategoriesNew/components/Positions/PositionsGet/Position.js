import React from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css'

import { positionDelete, set_position } from '../../../../../../../redux/actions/position';


const Position = ({position , positionDelete, setPosition, onOpen}) => {
    const onDelete = async (id, name) => {
        const confirm = window.confirm(`Вы уверены что хотите удалить позицию ${name}`)
        if(!confirm) return false
        const res = await positionDelete(id)
        if(res?.message) return M.toast({html: res.message})
        console.log('delete', res)
        M.toast({html: res?.message})
    }
    const onEdit = (position) => async (e) => {
        e.preventDefault()
        if(e.target.dataset.type) return onDelete(position._id, position.name)
        await setPosition(position)
        onOpen()
    }
    return (
        <a  
            onClick={onEdit(position)}
            href='/'
            className="collection-item collection-item-icon"
        >
            <span>
                {position.name} <strong>{position.cost} руб.</strong>
            </span>
            <span>
                <i className="material-icons" data-type='delete_btn'>delete</i>
            </span>
        </a>

    )
}

function mDTP(dispatch) {
    return {
        setPosition: position => dispatch(set_position(position)),
        positionDelete: id => dispatch(positionDelete(id))
    }
}
export default connect(null, mDTP)(Position)