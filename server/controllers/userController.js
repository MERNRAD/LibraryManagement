const User = require('../models/user')

const getUser = async (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            user
        });
    });
}

const getAllUsers = async (req, res) => {
    User.find({}, (err, users)=>{
        if (err) {
          return res.status(400).json({success: false, err});
        }

      return res.status(200).json({
        success: true,
        usersList: users
      });
    })
}

const getAllMembers = async (req, res) => {
  User.find({isAdmin: false}, (err, members) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      membersList: members
    });
  })
}

const addUser = async (req, res) => {
  const newUser = req.body
  console.log(req.body)

  User.findOne({email: newUser.email}, (err, user) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }
    if (user) {
      return res.status(403).json({success: false, message: "User already exists"});
    } else {
      const newUser = new User(req.body);
      newUser.setPassword(req.body.password);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({success: false, err});
        }
        return res.status(201).json({
          success: true,
          user
        });
      })
    }
  })
}

const updateUser = async (req, res) => {
    const userId = req.params.id
  const updatedUser = new User(req.body)
    updatedUser.setPassword(req.body.password);

    User.findByIdAndUpdate(userId,updatedUser, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedUser: user
        });
    })
}

const deleteUser = async (req, res) => {
    const userId = req.params.id

    User.findByIdAndDelete(userId, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedUser: user
        });
    })
}

module.exports = {
  getUser,
  getAllUsers,
  getAllMembers,
  addUser,
  updateUser,
  deleteUser
}
