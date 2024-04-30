// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { Component } from "react";
import CartItem from "../CartItem";

const firebaseConfig = {
    apiKey: "AIzaSyAF8XkcI_MtambSwhWmWlcqRzo_pnn8MKc",
    authDomain: "fir-6e590.firebaseapp.com",
    projectId: "fir-6e590",
    storageBucket: "fir-6e590.appspot.com",
    messagingSenderId: "525335186319",
    appId: "1:525335186319:web:6067a27193d4e3e21519fa",
    measurementId: "G-CNH3ZZ868H",
    databaseURL: "https://fir-6e590-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = ref(database, "demoTable");

class Home extends Component {
    state = { searchInput: "", items: [] }

    onChangeSearchInput = event => {
        this.setState({
            searchInput: event.target.value,
        })
    }

    addToDemo = () => {
        const { searchInput } = this.state
        if (searchInput !== "") push(db, searchInput);
        this.setState({ searchInput: "" })
    }

    componentDidMount() {
        onValue(db, (snapshot) => {
            if (snapshot.val() != null) this.setState({ items: Object.entries(snapshot.val()) });
            else this.setState({items: []});
        });
    }

    removeCartItem = async (itemId) => {
        await remove(ref(database, `demoTable/${itemId}`));
        this.componentDidMount();
    }

    render() {
        const { searchInput, items } = this.state;

        return (
            <div className="bg-container">
                <img src="../cart.jpg" alt="cart" />
                <input type="text" value={searchInput} onChange={this.onChangeSearchInput} onSubmit={this.addToDemo}/>
                <button type="button" onClick={this.addToDemo}>Add to Cart</button>
                <ul className="cart-items">
                    {items.map((each) => <CartItem key={each[1]} itemId={each[0]} itemName={each[1]} removeCartItem={this.removeCartItem} />)}
                </ul>
                <p className="instruction">{items.length === 0 ? '*Type a item and press Add to Cart':'*Click on item to remove'}</p>
            </div>
        )
    }
}

export default Home