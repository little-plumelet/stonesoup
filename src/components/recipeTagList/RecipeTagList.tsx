import { Divider } from 'antd';
import { ETags } from '../../constants';
import { IRecipeTag } from '../../interfaces/recipeTag.interface';
import { RecipeTag } from '../recipeTag';
import style from './style.module.css';

interface IRecipeTagList {
  tags: IRecipeTag[];
}

export function RecipeTagList({ tags }: IRecipeTagList) {
  const tagList: Array<JSX.Element> = [];
  tags.forEach(({ title, content }, index) => {
    if (title === ETags.servings) {
      tagList.push(
        <RecipeTag
          key={title}
          title={title}
          content={`${content}${content === 1 ? ' person' : ' people'}`}
        />
      );
    } else if (title === ETags.preptime) {
      tagList.push(
        <RecipeTag key={title} title={title} content={`${content} min`} />
      );
    } else {
      tagList.push(<RecipeTag key={title} title={title} content={content} />);
    }
    if (index !== tags.length - 1) {
      tagList.push(<Divider key={`${title}-divider`} type="vertical" />);
    }
  });

  return <div className={style.recipeTagContainer}>{tagList}</div>;
}
