import { FC } from "react";
import CloseBtn from "../buttons/CloseBtn";

type TechStackProps = {
  title: string;
  techs: string[][];
};
const TechStack: FC<TechStackProps> = ({ title, techs }) => {
  console.log(techs[0]);

  return (
    <li className="techItem">
      <ul className={`techItem__list`}>
        <CloseBtn />
        <h4 className="techItem__title techItem__title--colored"># {title}</h4>
        {techs.map((item) => (
          <li title={item[1]} className="techItem__list--item" key={item[0]}>
            {item[0]}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default TechStack;
