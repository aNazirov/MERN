import React from 'react';
import classes from './Category.module.css'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Category = ({category, match}) => {

    return (
        <div
            className="card waves-effect pointer"
        >
            <Link 
                className={classes.full}
                to={`${match.path}/${category._id}`} 
            >
                <div className="center">
                    <img 
                        src={category.imageSrc} 
                        alt={category.imageSrc} 
                        className="responsive-img order-img" 
                    />
                </div>
                <div className="card-content center p10">
                    <h5 className="m0">{category.name}</h5>
                </div>
            </Link>
        </div>
    )
}
export default withRouter(Category)