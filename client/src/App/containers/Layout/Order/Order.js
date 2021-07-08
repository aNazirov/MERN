import React, { useEffect, useRef, useState } from 'react';  
import { Route, Switch } from 'react-router-dom';
import M from 'materialize-css'

import CategoriesGet from './components/Categories/CategoriesGet';
import Modal from '../../../components/Modal/Modal';
import Navbar from './components/Navbar';
import PositionsGet from './components/Positions/PositionsGet';

const Order = ({match}) => {
    const modalRef = useRef(null)
    const [modal, setModal] = useState(null)
    const onCancel = () => modal?.close()
    const onOpen = () => modal?.open()
    useEffect(function initModal() {
        if(!modal) {
            const instance = M.Modal.init(modalRef.current, {onCloseEnd: () => {}})
            setModal(instance)
        }
        return () => {
            modal?.destroy()
        }
    }, [modal])

    return (
        <>
            <Navbar 
                open={onOpen}
            />
            <Switch>
                <Route path={`${match.path}/:id`} component={PositionsGet} />
                <Route path={`${match.path}`} component={CategoriesGet} exact/>
            </Switch>
            <Modal 
                innerRef={modalRef}
                cancel={onCancel}
            />
        </>
    )
}
export default Order