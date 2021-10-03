import { useState } from "react";

const Product = ({ product, suma, setSuma, setNizKorpa }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [counter, setCounter] = useState(0);
    const [error, setError] = useState(false);

    return (
        <div style={{ display: "inline-block", margin: "10px", width: "300px", padding: "5px" }}>
            <p><b>{product.name}, ${product.price}</b></p>
            <p>qty: {counter}</p>

            <button onClick={() => {
                setShowInfo(!showInfo);
            }}>{showInfo ? "Hide product info" : "Show product info"}</button>

            <p>{showInfo ? product.info : ""}</p>

            <div>
                <button onClick={() => {
                    setCounter(counter + 1);
                }}> + </button>
                <button onClick={() => {
                    setCounter(counter > 0 ? counter - 1 : 0);
                }}> - </button>

                {/* za testiranje */}
                {/* <p>trenutni iznos: {product.price * counter}</p> */}

                <p style={{ color: "red" }}>{error ? "The quantity must be selected" : ""}</p>

                <button onClick={() => {
                    if (counter !== 0) {
                        let iznos = counter * product.price;
                        setNizKorpa((prev) => {
                            let copyNiz = [...prev];
                            if (copyNiz.find(el => el.name === product.name)) {
                                // ako artikal vec postoji u korpi, samo povecavamo kolicinu i iznos
                                let indeks = copyNiz.findIndex(el => el.name === product.name);
                                copyNiz[indeks].qty += counter;
                                copyNiz[indeks].iznos += iznos;
                                console.log(copyNiz);
                                return copyNiz;

                            } else {
                                //ako artikal nije ranije dodat u korpu
                                copyNiz.push({ id: product.id, name: product.name, qty: counter, iznos: iznos });
                                console.log(copyNiz);
                                return copyNiz;
                            }
                        })
                        setError(false);
                        setCounter(0); //resetujem brojac kolicine
                    } else {
                        setError(true);
                    }
                }}>Add to basket</button>
            </div>
            <hr />
        </div >
    );
}

export default Product;