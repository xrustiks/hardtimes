import { Link } from 'react-router-dom';

const UserBar = () => {
  return (
    <div className="user-bar">
      <Link to="profile">Profile</Link>
      <Link to="logout">Logout</Link>
    </div>
  )
}

export default UserBar;