import { Card, CardHeader } from './ui/card';

const ShippingCalculator: React.FC = () => {

  const calculateShippingCost = (numberOfTenis: number) => {
    const weight = 1000 * numberOfTenis;
    const shippingCost = 41 + (9 * (weight / 100));

    return shippingCost.toFixed(2);
  };

  return (
    <Card>
      <CardHeader>Calcule o preço do frete</CardHeader>
      <div>
        
      </div>
    </Card>
  );
};

export default ShippingCalculator;