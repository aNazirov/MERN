import React, { useState, useRef, useEffect } from 'react'
import M from 'materialize-css'
import Filter from './Filter'

const Navbar = ({offset, filter, getOrders, isFiltered, setIsFiltered}) => {
    const toolRef = useRef()
    const [hide, setHide] = useState(true)
    const [tooltip, setTooltip] = useState(null)
    useEffect(() => {
        if(!tooltip) {
            const tool = M.Tooltip.init(toolRef.current, {html: 'Открыть фильтр', position: 'left'})
            setTooltip(tool)
        }
        return () => tooltip?.destroy()
    }, [tooltip])
    const hideSet = (val = true) => () => {
        setHide(val)
    }
    return (
        <>
            <div className="page-title">
                <h4>История заказов</h4>
                <button 
                    ref={toolRef}
                    className={`btn btn-small ${ hide ? '' : 'active' } ${ isFiltered ? 'red' : '' }`} 
                    onClick={ hide ? hideSet(false) : hideSet() }
                >
                    <i className="material-icons">filter_list</i>
                </button>
            </div>
            <Filter 
                hide={hide}
                getOrders={getOrders}
                offset={offset}
                setIsFiltered={setIsFiltered}
                filter={filter}
            />
        </>
    )
}
export default Navbar
