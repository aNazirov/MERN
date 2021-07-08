import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css'

const  Fab = () => {
    const fabRef = useRef()
    const [fab, setFab] = useState()
    useEffect(() => {
        if(!fab) {
            const instance = M.FloatingActionButton.init(fabRef.current)
            setFab(instance)
        }
        return () => {
            fab?.destroy()
        }
    }, [setFab, fab])
    return (
        <div className="fixed-action-btn" ref={fabRef}>
            <a href="/" onClick={e => {e.preventDefault()}} className="btn-floating btn-large red">
                <i className="large material-icons">add</i>
            </a>
            <ul>
                <li><Link to="/categories/new" className="btn-floating green"><i className="material-icons">assignment</i></Link></li>
                <li><Link to="/order" className="btn-floating blue"><i className="material-icons">list</i></Link></li>
            </ul>
        </div>
    )
}
export default Fab