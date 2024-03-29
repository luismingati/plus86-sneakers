import { getOrSearchTenis, getTenisQuantity } from './_actions/getTenis';
import { GenericLayout } from './GenericPage';

const Home = () => (
  <GenericLayout fetchItemsFunc={getOrSearchTenis} fetchQuantityFunc={getTenisQuantity} />
);
export default Home;
