import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, deleteFromCart, RestoService}) => {
    if (items.length === 0) {
        return (<div className='cart__title'>Корзина пуста</div>)
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, qtty} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$x{qtty}</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick = {() => {RestoService.setOrder(generateOrder(items))}} className = 'order'>Оформить заказ</button>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));