import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Loader from '@material-ui/core/CircularProgress';
import Category from './Category';
import { categoriesGet, reset_form } from '../../../../../redux/actions/category';

const CategoriesGet = ({categoryesGet, loading, categories, reset}) => {
    useEffect(function getCategories() {
        categoryesGet()
        return () => reset()
    }, [categoryesGet, reset])

        return (
            <>
                {
                    loading
                        ? <div className="row"><div className="col s12 center-align"><Loader color="secondary"/></div></div>
                        : categories.length && !loading
                            ? <div className="frow order-row">
                                {
                                    categories.map( (item, i) => {
                                        const key = `${i}${Math.floor(Math.random() * 1000)}` 
                                        return (
                                            <Category category={item} key={key}/>
                                        )
                                    })
                                }
                                </div>
                            : <span className="center-align">Категории пусты.</span>
                }
            </>
        )
}
function mSTP(state) {
    return {
        loading: state.category.loading,
        categories: state.category.categories,
    }
}
function mDTP(dispatch) {
    return {
        categoryesGet: () => dispatch(categoriesGet()),
        reset: () => dispatch(reset_form())
    }
}
export default withRouter(connect(mSTP, mDTP)(CategoriesGet))
