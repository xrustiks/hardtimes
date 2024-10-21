import { Link } from 'react-router-dom';

const UserBar = () => {
  return (
    <div className="user-bar">
      <Link to="profile">Профиль</Link>
      <Link to="logout">Выйти</Link>
    </div>
  )
}

export default UserBar;