import Role from "../models/RoleModel.js";
import { HttpError } from "../utils/httpError.js";

const findRoleOr404 = async (id) => {
    const role = await Role.findByPk(id);
    if (!role) throw new HttpError(404, 'Role not found');
    return role;
};

export const getRoles = async (req, res) => {
    const roles = await Role.findAll();
    res.status(200).json(roles);
};

export const getRole = async (req, res) => {
    res.status(200).json(await findRoleOr404(req.params.id));
};

export const createRole = async (req, res) => {
    const newRole = await Role.create({ type: req.body.type });
    res.status(201).json(newRole);
};

export const updateRole = async (req, res) => {
    const role = await findRoleOr404(req.params.id);
    await role.update({ type: req.body.type });
    res.status(200).json(role);
};

export const deleteRole = async (req, res) => {
    const role = await findRoleOr404(req.params.id);
    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
};
