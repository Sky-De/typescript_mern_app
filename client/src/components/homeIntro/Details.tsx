import { FC, useState } from "react";

type DetailsProps = {
  title: string;
  techs: string[][];
};
const Details: FC<DetailsProps> = ({ title, techs }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <li className="techItem">
      <h4
        onClick={() => setIsActive((pre) => !pre)}
        className="techItem__title"
      >
        {title}
      </h4>
      <ul className={`techItem__list ${isActive ? "active" : ""}`}>
        {techs.map((item) => (
          <li title={item[1]} className="techItem__list--item" key={item[0]}>
            {item[0]}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Details;
