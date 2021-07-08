import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import Loader from '@material-ui/core/CircularProgress';
import { categoriesGet } from '../../../../../redux/actions/category';

const CategoriesGet = ({categoryesGet, loading, categories, match}) => {
    useEffect(function getCategories() {
        categoryesGet()
    }, [categoryesGet])

        return (
            <>
                {
                    loading
                        ? <Loader color="secondary"/>
                        : categories.length && !loading
                            ? <div className="collection left-align">
                                    {
                                        categories.map( (item, i) => {
                                            const key = `${i}${Math.floor(Math.random() * 1000)}` 
                                            return (
                                                <Link 
                                                    key={key} 
                                                    to={`${match.path}/${item._id}`} 
                                                    className="collection-item"
                                                >
                                                    {item.name}
                                                </Link>
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
    }
}
export default withRouter(connect(mSTP, mDTP)(CategoriesGet))
