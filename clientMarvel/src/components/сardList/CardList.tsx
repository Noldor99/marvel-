import { useTypedSelector } from "../../hook/useTypedSelector";
import Card from "../card/Card";
import css from './CardList.module.sass'

const CardList = () => {

  const { heroes } = useTypedSelector(state => state.hero);


  return (
    <div className={css.container}>
      {heroes.map((hero) => (
        <Card
          key={hero.id}
          hero={hero}
        />
      ))}
    </div>
  );
};

export default CardList;
