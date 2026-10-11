import PlaceCategory from "../models/PlaceCategoryModel.js";
import { HttpError } from "../utils/httpError.js";

const findPlaceCategoryOr404 = async (where) => {
    const placeCategory = await PlaceCategory.findOne({ where });
    if (!placeCategory) throw new HttpError(404, "Place category not found.");
    return placeCategory;
};

export const getPlaceCategories = async (req, res) => {
    const placeCategories = await PlaceCategory.findAll();
    res.status(200).json(placeCategories);
};

export const getPlaceCategory = async (req, res) => {
    res.status(200).json(await findPlaceCategoryOr404({ name: req.params.name }));
};

export const getSelectedPlaceCategories = async (req, res) => {
    const placeCategories = await PlaceCategory.findAll({ where: { selected: true }, order: [['id', 'ASC']] });
    res.status(200).json(placeCategories);
};

export const createPlaceCategory = async (req, res) => {
    const { name, searchName, tag, icon, iconColor, description, selected } = req.body;
    const newPlaceCategory = await PlaceCategory.create({ name, searchName, tag, icon, iconColor, description, selected });
    res.status(201).json(newPlaceCategory);
};

export const updatePlaceCategory = async (req, res) => {
    const { name, searchName, tag, icon, iconColor, description, selected } = req.body;
    const placeCategory = await findPlaceCategoryOr404({ id: req.params.id });
    await placeCategory.update({ name, searchName, tag, icon, iconColor, description, selected });
    res.status(200).json(placeCategory);
};

export const deletePlaceCategory = async (req, res) => {
    const placeCategory = await findPlaceCategoryOr404({ id: req.params.id });
    await placeCategory.destroy();
    res.status(200).json({ message: "Place category deleted successfully." });
};
