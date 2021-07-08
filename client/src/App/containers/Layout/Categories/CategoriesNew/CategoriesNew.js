import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css'

import Positions from './components/Positions/Positions';
import Create from './components/Create/Create';
import Delete from './components/Delete';
import { categoryGet, reset_form } from '../../../../redux/actions/category';


const CategoriesNew = ({match, categoryGet, reset_form, location}) => {
    const iD = match.params?.id
    const created = location.created
    useEffect( () => {
        async function getCategory() {
            if(iD) {
                const error = await categoryGet(iD)
                if (error) return M.toast({html: error.message})
            }
        }
        if(created) M.toast({html: 'Категория создана.'})
        getCategory()
        return function resetForm() {
            reset_form()
            M.Toast.dismissAll()
        }
    }, [categoryGet, iD, reset_form, created])
    return (
        <>
            <div className="page-title">
                <h4>
                    <Link to="/categories">Категории</Link>
                    <i className="material-icons">keyboard_arrow_right</i>
                    {iD ? 'Изменить' : 'Добавить'} категорию
                </h4>
                
                <span>
                    { iD ? <Delete /> : null }
                </span>
            </div>

            <div className="row">
                <Create />
            </div>
            { iD ? <Positions /> : null }
        </>
    )
}

function mDTP(dispatch) {
    return {
        categoryGet: id => dispatch(categoryGet(id)),
        reset_form: () => dispatch(reset_form())
    }
}
export default connect(null, mDTP)(CategoriesNew)
