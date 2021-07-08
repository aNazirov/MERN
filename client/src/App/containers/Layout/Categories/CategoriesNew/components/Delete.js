import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { withRouter } from 'react-router-dom';
import { categoryDelete } from '../../../../../redux/actions/category';




const Delete = ({categoryDelete, history, name, id}) => {
    const deleteCategory = async () => {
        const confirm = window.confirm(`Вы уверены, что хотите удалить категорию ${name}?`)
        if(!confirm) return
        const error = await categoryDelete(id)
        if(error) return M.toast({html: error.message})
        history.push({
            pathname: '/categories',
            deleted: true
        })
    }
    return (
        <button 
            className="btn btn-small red" 
            onClick={deleteCategory}
        >
            <i className="material-icons">delete</i>
        </button>
    )
}
function mSTP(state) {
    return {
        name: state.category?.category?.name,
        id: state.category?.category?._id,
    }
}
function mDTP(dispatch) {
    return {
        categoryDelete: id => dispatch(categoryDelete(id)),
    }
}
export default withRouter(connect(mSTP, mDTP)(Delete))
