import React from 'react';
import classes from './Image.module.css'
import { connect } from 'react-redux';

const Image = ({image, imagePreview}) => {
    return (
        <img 
            className={`responsive-img ${classes.h200}`} 
            src={image && !imagePreview ? `/${image}` : imagePreview}
            hidden={!image && !imagePreview}
            alt={imagePreview}
        />
    )
}
function mSTP(state) {
    return {
        image: state.category?.category?.imageSrc,
        imagePreview: state.category?.imagePreview
    }
}
export default connect(mSTP)(Image)
