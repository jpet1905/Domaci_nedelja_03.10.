import Article from "./ArticleInBasket";

const Total = ({ nizKorpa, setNizKorpa }) => {
    let ukupanBezPoreza = nizKorpa.reduce((suma, artikal) => { return suma + artikal.iznos }, 0)
    let porez = (ukupanBezPoreza * 15) / 100;
    let ukupnoSaPorezom = ukupanBezPoreza + porez;

    return (
        <div style={{ background: "#5b95db", color: "#fff" }}>
            {/* prikazuje artikle koji su ubaceni u korpu */}
            <h2>Your basket:</h2>
            <div>
                {
                    (nizKorpa.length === 0)
                        ?
                        <p><em>...is empty. Fill it with our products.</em></p>
                        :
                        nizKorpa.map(artikal => <Article key={artikal.id} artikal={artikal} nizKorpa={nizKorpa} setNizKorpa={setNizKorpa} />)
                }
            </div>
            <div>
                <p>-------------------------------------------</p>
                {/* iznos bez poreza */}
                <p>Total price: ${Number(ukupanBezPoreza.toFixed(2))}</p>
                {/* porez */}
                <p>Tax(15%): ${Number(porez.toFixed(2))}</p>
                {/* ukupan iznos sa porezom */}
                <p><b>Total inc tax: ${Number(ukupnoSaPorezom.toFixed(2))}</b></p>
            </div>
            <hr />
        </div>
    );
}

export default Total;