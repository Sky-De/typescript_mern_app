type UserEditBtnProps = {
  clickHandler: () => void;
  name: string;
};

const UserEditBtn: React.FC<UserEditBtnProps> = ({ clickHandler, name }) => {
  return (
    <button className="btn userEditBtn" onClick={clickHandler}>
      {name}
    </button>
  );
};

export default UserEditBtn;
