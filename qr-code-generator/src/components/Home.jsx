import { Component } from "react";
import QRCode from 'qrcode';

class Home extends Component {

    state = { qrCode: "", searchInput: "", isEmpty: false, generatedImg: "" };

    generateQR = async () => {
        try {
            const { searchInput } = this.state;
            if (searchInput === "") {
                this.setState({ isEmpty: true });
                return
            }
            this.setState({ qrCode: await QRCode.toDataURL(searchInput), generatedImg: searchInput})
        } catch (err) {
            console.error(err)
        }
    }

    onSearchInputChange = (e) => {
        this.setState({ searchInput: e.target.value, isEmpty: false })
    }

    downloadQR = () => {
        const {qrCode} = this.state;

        const link = document.createElement("a");
        link.href = qrCode;
        link.download = "QR Code"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        const { qrCode, searchInput, isEmpty, generatedImg } = this.state;

        return (<div className="card">
            <h3>{qrCode !== "" ? "Here is your QR Code for " + generatedImg : "Enter the url/ text tot generate QR Code"}</h3>

            {qrCode !== "" ? <img src={qrCode} /> : null}

            <div className="input-container">
                <input onChange={(e) => this.onSearchInputChange(e)} value={searchInput} id="qr-input" type="search" placeholder="Enter here..." />
                {isEmpty ? <label htmlFor="qr-input">Enter Text To Generate</label> : null}
                <button onClick={this.generateQR}>Genrate QR</button>
                <button onClick={this.downloadQR}>Download QR</button>
            </div>
        </div>)
    }
}

export default Home