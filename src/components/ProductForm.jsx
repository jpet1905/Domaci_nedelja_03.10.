import { useState } from "react";
import { createProduct, deleteProduct } from "../service";
import { isNotEmptyField, onlyDigits, positiveNumber } from "../validation";


const ProductForm = ({ products, setProducts }) => {
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");
    const [inputInfo, setInputInfo] = useState("");
    const [choosenId, setChoosenId] = useState("-1");
    const [errors, setErrors] = useState([false, false, false, false]) //false - nema greske
    let errorMessages = ["The field cannot be empty",
        "The price must be a number",
        "The price must be greater than 0",
        "There is already a product with that name"]

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
                <h2>Add new product:</h2>

                <label>Name:</label><br />
                <input type="text" value={inputName} placeholder="e.g.) android" onChange={(e) => {
                    setInputName(e.target.value);
                }} /><br />
                <label>Price:</label><br />
                {/* (nijedna varijanta) validacija za NaN nece da radi ako je type="number" !!! */}
                {/* a ako ispisem slova u type="number",to vidi kao prazno polje pa mi ne ispisuje tacnu poruku o gresci za korisnika */}
                {/* zato sam odabrala type="text" i za cenu */}
                <input type="text" value={inputPrice} placeholder="e.g.) 100" onChange={(e) => {
                    setInputPrice(e.target.value)
                }} /><br />
                <label>Info:</label><br />
                <input type="text" value={inputInfo} placeholder="e.g.) product of google" onChange={(e) => {
                    setInputInfo(e.target.value)
                }} /><br />

                <button style={{ marginTop: "10px" }} onClick={() => {
                    //moram da resetujem ako je sa prethodnim klikom(pokusajem kreiranja) bila ispisana neka druga greska koju je sad ispravio (a napravio novu gresku)
                    setErrors(prev => prev.map(el => false));
                    // prvo da prodje sve validacije pre ubacivanja novog proizvoda u niz
                    if (!isNotEmptyField(inputName) || !isNotEmptyField(inputPrice)) {
                        setErrors((prev) => prev.map((el, i) => i === 0 ? true : el));
                        return
                    } else if (!onlyDigits(inputPrice)) {
                        setErrors((prev) => prev.map((el, i) => i === 1 ? true : el));
                        return
                    } else if (!positiveNumber(inputPrice)) {
                        setErrors((prev) => prev.map((el, i) => i === 2 ? true : el));
                        return
                    } else if (products.some(product => product.name === inputName)) {
                        // ako vec imamo u proizvodima neki artikal sa tim nazivom
                        setErrors((prev) => prev.map((el, i) => i === 3 ? true : el));
                        return
                    } else {
                        // ako je prosao sve validacije
                        setErrors(prev => prev.map(el => false)); //brisemo poruke o greskama

                        let newProduct = {
                            name: inputName,
                            price: Number(inputPrice),
                            info: inputInfo
                        }

                        createProduct(newProduct).then(res => {
                            console.log(res.data);
                            setProducts((prev) => {
                                return [...prev, res.data]
                            })
                        })
                        //resetujemo sva input polja nakon submita
                        setInputName("");
                        setInputPrice("");
                        setInputInfo("");
                    }
                }}>Create product</button>

                {/* paragrafi za ispis greske */}
                <p style={{ color: "red" }}>{errors[0] ? errorMessages[0] : ''}</p>
                <p style={{ color: "red" }}>{errors[1] ? errorMessages[1] : ''}</p>
                <p style={{ color: "red" }}>{errors[2] ? errorMessages[2] : ''}</p>
                <p style={{ color: "red" }}>{errors[3] ? errorMessages[3] : ''}</p>
            </div>
            <div style={{ width: "50%" }}>
                <h2>Delete product:</h2>

                <select style={{ marginBottom: "10px" }} defaultValue="-1" onChange={(e) => { setChoosenId(e.target.value) }}>
                    <option value="-1" disabled hidden>Choose the product</option>
                    {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                </select><br />

                <button onClick={() => {
                    deleteProduct(choosenId).then(res => {
                        setProducts((prev) => {
                            // PRVI NACIN:
                            // let kopija = [...prev];
                            // let indeks = kopija.findIndex(el => el.id === choosenId);
                            // kopija.splice(indeks, 1);
                            // return kopija

                            // DRUGI NACIN:
                            return prev.filter(el => el.id !== choosenId)
                        })
                    })
                }}>Delete</button>
            </div>
        </div>
    )
}
export default ProductForm;