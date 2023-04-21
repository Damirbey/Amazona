import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  return <h2>{slug}</h2>;
}
export default ProductScreen;
