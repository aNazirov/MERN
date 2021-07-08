import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css'

import CategoriesGet from './CategoriesNew/components/CategoriesGet';
import { connect } from 'react-redux';
import { reset_form } from '../../../redux/actions/category';

const Categories = ({location, match, reset}) => {
    const deleted = location.deleted
    useEffect(function getCategories() {
        if(deleted) M.toast({html: 'Категория успешно удалена.'})
        return () => reset()
    }, [deleted, reset])

        return (
            <>
                <div className="page-title">
                    <h4>Категории</h4>
                    <Link 
                        to={`${match.path}/new`} 
                        className="waves-effect waves-light btn grey darken-1"
                    >
                        Добавить категорию
                    </Link>
                </div>
                <div className="row">
                    <div className="col s12 center-align">
                        <CategoriesGet />
                    </div>
                </div>
            </>
        )
}
function mDTP(dispatch) {
    return {
        reset: () => dispatch(reset_form())
    }
}
export default connect(null, mDTP)(Categories)
