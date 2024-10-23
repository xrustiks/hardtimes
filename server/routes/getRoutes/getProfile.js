const getProfile = (req, res) => {
  try {
    if (!req.user.userName) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: `Hello, ${ req.user.userName }!`, user: req.user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export default getProfile;