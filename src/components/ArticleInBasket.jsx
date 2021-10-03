const Article = ({ artikal, nizKorpa, setNizKorpa }) => {
    return (
        <div>
            <p style={{ display: "inline-block", marginRight: "10px" }} key={artikal.id}>{`${artikal.name} ~ qty: ${artikal.qty} / sum: $${(artikal.iznos).toFixed(2)}`}</p>
            <button onClick={() => {
                setNizKorpa((prev) => {
                    let kopija = [...nizKorpa];
                    let indeks = kopija.findIndex(el => el.id === artikal.id);
                    kopija.splice(indeks, 1);
                    console.log(kopija);
                    return kopija
                })
            }}>Remove from basket</button>
        </div>
    );
}

export default Article;