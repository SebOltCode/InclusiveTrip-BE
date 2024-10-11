import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getCountUsers = async (req, res) => {
    try {
        const users = await User.count();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Please provide id in the params');
        const userToGet = await User.findOne({ where: { id } });
        if (!userToGet) throw new Error('User not found');
        res.status(200).json(userToGet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, roleId, blocked, profilePhoto } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Please provide firstName, lastName,email and password ' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'user already exists' });
        }

        const newUser = await User.create({ firstName, lastName, email, password, roleId, blocked, profilePhoto });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, roleId, blocked, profilePhoto } = req.body;
    try {
        if (!id) throw new Error('Please provide id in the params');
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Please provide firstName, lastName,email and password in the body' });
        }
        const userToUpdate = await User.findOne({ where: { id } });
        if (!userToUpdate) throw new Error('User not found');
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.email = email;
        userToUpdate.password = password;
        userToUpdate.roleId = roleId;
        userToUpdate.blocked = blocked;
        userToUpdate.profilePhoto = profilePhoto;
        await userToUpdate.save();
        res.status(200).json(userToUpdate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Please provide id in the params');
        const userToDelete = await User.findOne({ where: { id } });
        if (!userToDelete) throw new Error('User not found');
        await userToDelete.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}