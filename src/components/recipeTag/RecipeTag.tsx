import { IRecipeTag } from '../../interfaces/recipeTag.interface';
import style from './style.module.css';

export function RecipeTag({ title, content }: IRecipeTag) {
  return (
    <div className={style.tagBlock}>
      <div className={style.tagTitle}>{title.toUpperCase()}</div>
      <div className={style.tagContent}>{content}</div>
    </div>
  );
}
