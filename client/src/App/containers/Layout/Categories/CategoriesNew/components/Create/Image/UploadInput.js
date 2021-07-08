import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { set_image, set_imagePreview } from '../../../../../../../redux/actions/category';


const imageUpload = (setImage, setImagePreview) => (e) => {
    const file = e.target.files[0]
    setImage(file)

    const reader = new FileReader()

    reader.onload = () => {
        setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
}

const UploadInput = ({setImage, setImagePreview, isSubmitting, handleBlur, handleChange}) => {
    const hiddenRef = useRef()
    const imageSelect = () => {
        hiddenRef.current.click()
    }

    return (
        <>
            <input 
                ref={hiddenRef}
                onChange={handleChange}
                onInput={imageUpload(setImage, setImagePreview)}
                onBlur={handleBlur}
                id="image"
                name="image"
                type="file"
                hidden
            />
            <button 
                onClick={imageSelect}
                type="button"
                disabled={isSubmitting}
                className="waves-effect waves-light btn orange lighten-2 mb2"
            >
                <i className="material-icons left">backup</i>
                Загрузить изображение
            </button>
        </>
    )
}
function mDTP(dispatch) {
    return {
        setImage: (image) => dispatch(set_image(image)),
        setImagePreview: (imagePreview) => dispatch(set_imagePreview(imagePreview))
    }
}
export default connect(null, mDTP)(UploadInput)
