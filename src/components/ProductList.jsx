import Product from "./Product"

const ProductList = ({ products, suma, setSuma, setNizKorpa }) => {

    return (
        <div style={{background: "#1ed760", display: "flex", flexFlow: "row wrap"}}>
            {products.map(product => <Product key={product.id} product={product} products={products} suma ={suma} setSuma={setSuma} setNizKorpa={setNizKorpa}/>)}
        </div>

    )
}
export default ProductList;