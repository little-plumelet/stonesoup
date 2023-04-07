import { Steps, Typography } from 'antd';
import { useState } from 'react';
import { IStep } from '../../interfaces/instruction.interface';

const { Title } = Typography;

interface IRecipeInstructionsProps {
  steps: IStep[];
}

export function RecipeInstructions({ steps }: IRecipeInstructionsProps) {
  const [current, setCurrent] = useState(0);

  const onStepChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <>
      {!steps?.length && <Title level={4}>No instructions...</Title>}
      {!!steps?.length && (
        <>
          <Title level={3}>Instructions:</Title>
          <Steps
            direction="vertical"
            current={current}
            items={steps?.map(({ step }) => {
              return { description: step };
            })}
            onChange={onStepChange}
            data-testid="steps"
          />
        </>
      )}
    </>
  );
}
