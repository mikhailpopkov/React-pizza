import { useDispatch } from 'react-redux';
import { addItem, CartSlice, minusItem, removeItem } from '../redux/slices/cartSlice';

type CartItemProps = {id: string, title: string, price: number, imageUrl: string, count: number, type: string, size: string };

const CartItem: React.FC<CartItemProps> = ({id, title, price, imageUrl, count, type, size }) => {

    const dispath = useDispatch();

    const onClickAdd = () => {
        dispath(addItem({
            id,
        } as CartSlice))
    }

    const onClickSubtract = () => {
        dispath(minusItem(id))
    }

    const onClickRemove = () => {
        if (window.confirm('Удалить данный товар из корзины ?')) {
            dispath(removeItem(id))
        }
    }
    
  return (
    <div className="cart__item">
        <div className="cart__item-img">
            <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
            />
        </div>
        <div className="cart__item-info">
            <h3>{title}</h3>
            <p>{type}, {size} см.</p>
        </div>
        <div className="cart__item-count">
            <button disabled={count === 1} onClick={onClickSubtract} className="button button--outline button--circle cart__item-count-minus">
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.04019 0.0399933H8.84019C9.37035 0.0399933 9.80019 0.469833 9.80019 0.999993C9.80019 1.53015 9.37035 1.95999 8.84019 1.95999H4.04019H1.1602C0.630035 1.95999 0.200195 1.53015 0.200195 0.999993C0.200195 0.469833 0.630035 0.0399933 1.1602 0.0399933H4.04019Z" fill="#FE5F1E"/>
                </svg>
            </button>
            <b>{count}</b>
            <button onClick={onClickAdd} className="button button--outline button--circle cart__item-count-plus">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.84019 4.04001H5.96019V1.16001C5.96019 0.629852 5.53035 0.200012 5.00019 0.200012C4.47003 0.200012 4.04019 0.629852 4.04019 1.16001V4.04001H1.1602C0.630035 4.04001 0.200195 4.46985 0.200195 5.00001C0.200195 5.53017 0.630035 5.96001 1.1602 5.96001H4.04019V8.84001C4.04019 9.37017 4.47003 9.80001 5.00019 9.80001C5.53035 9.80001 5.96019 9.37017 5.96019 8.84001V5.96001H8.84019C9.37035 5.96001 9.80019 5.53017 9.80019 5.00001C9.80019 4.46985 9.37035 4.04001 8.84019 4.04001Z" fill="#EB5A1E"/>
                </svg>
            </button>
        </div>
        <div className="cart__item-price">
            <b>{price * count}</b>
        </div>
        <div className="cart__item-remove">
            <div onClick={onClickRemove} className="button button--outline button--circle">
                <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545525 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545525 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838649 7.36965 0.838649 8.04086 1.25258 8.45479C1.66651 8.86872 2.33772 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z" fill="#D0D0D0"/>
                </svg>
            </div>
        </div>
    </div>
  )
}

export default CartItem;