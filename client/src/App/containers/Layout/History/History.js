import React, { useCallback, useEffect, useRef, useState } from 'react'; 
import M from 'materialize-css'
import Orders from './components/Orders';
import Navbar from './components/Navbar';
import ModalHistory from '../../../components/Modal/ModalHistory';
import { getAllOrders, set_list } from '../../../redux/actions/order';
import { connect } from 'react-redux';

const STEP = 2

const History = ({setList, getOrders}) => {
    let [offset, limit, filter] = [useRef(0), useRef(STEP),  useRef({})]
    const modalRef = useRef()
    const [[modal, setModal], [isFiltered, setIsFiltered]] = [useState(), useState(false)]
    const ordersGet = useCallback(async () => {
        const params = Object.assign({}, filter.current, {
            limit: limit.current,
            offset: offset.current
        })
        if(Object.keys(filter.current).length) setIsFiltered(true)
        await getOrders(params)
    }, [getOrders, limit, offset, filter, setIsFiltered])
    useEffect(() => {
        if(!modal) {
            const instance = M.Modal.init(modalRef.current, {onCloseEnd: () => {setList([])}})
            setModal(instance)
        }
        return () => {
            modal?.destroy()
        }
    }, [ setList, modal, setModal ])
    const onClose = () => modal?.close()
    const onOpen = () => modal?.open()
    return (
        <>
            <Navbar 
                getOrders={ordersGet}
                offset={offset}
                filter={filter}
                isFiltered={isFiltered}
                setIsFiltered={setIsFiltered}
            />
            <Orders 
                open={onOpen}
                offset={offset}
                limit={limit}
                getOrders={ordersGet}
            />
            <ModalHistory 
                innerRef={modalRef}
                cancel={onClose}
            />
        </>
    )
}
function mDTP(dispatch) {
    return {
        setList: (list) => dispatch(set_list(list)),
        getOrders: (params) => dispatch(getAllOrders(params))
    }
}
export default connect(null, mDTP)(History)