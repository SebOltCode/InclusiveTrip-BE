import Role from "../models/RoleModel.js";


export const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRole = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Please provide id in the params');
        const roleToGet = await Role.findByPk(id);
        res.status(200).json(roleToGet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createRole = async (req, res) => {
    const { type } = req.body;
    try {
        if (!type) throw new Error('Please provide type in the body');
        const newRole = await Role.create({ type });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    try {
        if (!type) throw new Error('Please provide type in the body');
        if (!id) throw new Error('Please provide id in the params');
        const roleToUpdate = await Role.findByPk(id);
        roleToUpdate.type = type;
        await roleToUpdate.save();
        res.status(200).json(roleToUpdate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Please provide id in the params');
        const role1 = await Role.findByPk(id);
        if (!role1) throw new Error('Role not found');
        await role1.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}