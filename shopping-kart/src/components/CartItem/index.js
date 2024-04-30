import { Component } from "react";

class CartItem extends Component {
    render() {
        const { itemId, itemName, removeCartItem } = this.props;
        const onDelete = () => {
            removeCartItem(itemId);
        }
        return (
            <button className="item" onClick={onDelete}>{itemName}</button>
        )
    }
}

export default CartItem