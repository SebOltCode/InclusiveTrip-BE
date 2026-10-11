import Barrier from "../models/BarrierModel.js";
import { HttpError } from "../utils/httpError.js";

const findBarrierOr404 = async (name) => {
    const barrier = await Barrier.findOne({ where: { name } });
    if (!barrier) throw new HttpError(404, "Barrier not found");
    return barrier;
};

export const getBarriers = async (req, res) => {
    const barriers = await Barrier.findAll({ order: [['createdAt', 'ASC']] });
    res.status(200).json(barriers);
};

export const getSelectedBarriers = async (req, res) => {
    const barriers = await Barrier.findAll({ where: { selected: true }, order: [['createdAt', 'ASC']] });
    res.status(200).json(barriers);
};

export const getBarrier = async (req, res) => {
    res.json(await findBarrierOr404(req.params.name));
};

export const createBarrier = async (req, res) => {
    const { name, description, selected } = req.body;
    const newBarrier = await Barrier.create({ name, description, selected });
    res.status(201).json(newBarrier);
};

export const updateBarrier = async (req, res) => {
    const { name, description, selected } = req.body;
    const barrier = await findBarrierOr404(req.params.name);
    await barrier.update({ name, description, selected });
    res.json(barrier);
};

export const deleteBarrier = async (req, res) => {
    const barrier = await findBarrierOr404(req.params.name);
    await barrier.destroy();
    res.json({ message: "Barrier deleted successfully" });
};
