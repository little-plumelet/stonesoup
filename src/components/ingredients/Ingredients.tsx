import { List, Typography } from 'antd';
import { IIngredient } from '../../interfaces/ingredient.interface';

interface IIngridentsProps {
  extendedIngredients: IIngredient[];
}

const { Title } = Typography;

export function Ingredients({ extendedIngredients }: IIngridentsProps) {
  return (
    <>
      <Title level={3}>Ingredients:</Title>
      <List
        size="small"
        dataSource={extendedIngredients}
        renderItem={(item: IIngredient) => (
          <List.Item>
            <List.Item.Meta description={item.name} />
            <div>
              {item.amount} {item.unit}
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
