import openConnection from '../../db/connection.js';

const loginUser = async(req, res) => {
  const { userName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  // Надо дать юзеру вариант, чтобы он мог ввести никнейм вместо имейла
  // Надо сравнить email или userName со всеми имеющимися в базе данных
  // Если совпадение найдено, значит юзер зарегистрирован

  let connection;
  try {
    connection = await openConnection();


  } catch(error) {

  }
}

export default loginUser;