import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList"
import Search from "./components/Search";
import Total from "./components/Total";
import { getAllProducts } from "./service"

function App() {
  const [products, setProducts] = useState([]);
  const [suma, setSuma] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const [nizKorpa, setNizKorpa] = useState([]);

  useEffect(() => {
    getAllProducts().then(res => {
      console.log(res.data);
      setProducts(res.data);
    })
  }, [])

  return (
    <div>
      {/* dodavanje novog artikla u asortiman/na server */}
      <ProductForm products={products} setProducts={setProducts} />
      {/* prikaz trenutne korpe i obracun za placanje */}
      <Total suma={suma} nizKorpa={nizKorpa} setNizKorpa={setNizKorpa}/>
      {/* pretraga proizvoda - da olaksa kupcu snalazenje u velikom broju artikala */}
      <Search setInputSearch={setInputSearch} />
      {/* asortiman, svi artikli */}
      <ProductList products={products.filter(product => product.name.toLowerCase().includes(inputSearch.toLowerCase()))} suma={suma} setSuma={setSuma} setNizKorpa={setNizKorpa} />
    </div>
  );
}

export default App;
