import makeTitle from "../../../utils/makeTitle.js";

const UserProfile = () => {
  // Making title for the component
  useEffect(() => {
    makeTitle("Профиль пользователя");
  }, [])

  return (
    <div className="user-profile">
      <h1>Имя пользователя</h1>
      <p>Избранные цитаты</p>
    </div>
  );
};

export default UserProfile;