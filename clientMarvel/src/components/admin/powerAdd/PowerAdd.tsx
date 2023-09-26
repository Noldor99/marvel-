import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IHero } from "../../../model/heroModel";
import { IPower } from "../../../model/powerModel";
import { useRemovePowerMutation, useAddPowerMutation } from "../../../store/api/powerApi";
import CustomButton from "../../UI/customButton/CustomButton";
import CustomInput from "../../UI/customInput/CustomInput";
import IconButton from "../../UI/iconButton/IconButton";
import css from './PowerAdd.module.sass'

interface PowerAddProps {
  hero?: IHero;
}

const PowerAdd: React.FC<PowerAddProps> = ({ hero }: PowerAddProps) => {


  const [deleteSuperpower] = useRemovePowerMutation();
  const [createSuperpower] = useAddPowerMutation();
  const [newSuperpower, setNewSuperpower] = useState('');

  const handleDeleteSuperpower = (powerId: number) => {
    deleteSuperpower(powerId);
  };


  if (!hero) {
    return null;
  }

  const handleCreateSuperpower = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createSuperpower({ heroId: hero.id, power: newSuperpower });
    setNewSuperpower('');
  };

  return (
    <div className={css.container}>
      <h4>Supserpowers:</h4>
      {hero?.powers.map((power: IPower) => (
        <div key={power.id}>
          <div className={css.power__body}>
            <p>{power.power}</p>
            <IconButton
              color="error"
              onClick={() => handleDeleteSuperpower(power.id)}>
              <FaTrash />
            </IconButton>
          </div>
        </div>
      ))}
      <form onSubmit={handleCreateSuperpower}>
        <div className={css.form__body}>
          <CustomInput
            label="New Superpower"
            value={newSuperpower}
            onChange={(e) => setNewSuperpower(e.target.value)}
          />
          <CustomButton type="submit">Add</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default PowerAdd;
