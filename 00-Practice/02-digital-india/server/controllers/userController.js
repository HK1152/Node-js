import { users } from "../data/userData.js";

export const getAllUsers = async(req, res) => {
    try{
        let usersData = users;
        res.status(200).json(usersData);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};



export const getUserById = async(req, res) => {
    try{
        let id = req.params.id;
        let userData = users.find(user => user.id === parseInt(id));
        if (!userData) return res.status(404).json({message: "User not found"});
        res.status(200).json(userData);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

// export const createUser = async(req, res) => {
//     try{
//         const user = {
//         id: users.length + 1,
//         name: req.body.name,
//         role: req.body.role,
//         email: req.body.email
//     };
//     users.push(user);
//     res.status(201).json(user);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// };

// export const updateUser = async(req, res) => {
//     try{
//     const user = users.find(user => user.id === parseInt(req.params.id));
//     if (!user) return res.status(404).send("User not found");
//     user.name = req.body.name;
//     user.role = req.body.role;
//     user.email = req.body.email;
//     res.status(201).json(user);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// };

// export const deleteUser = async(req, res) => {
//     try{
//     const user = users.find(user => user.id === parseInt(req.params.id));
//     if (!user) return res.status(404).send("User not found");
//     const index = users.indexOf(user);
//     users.splice(index, 1);
//     res.json(user);
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// };
