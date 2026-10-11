import sequelize from "./index.js";
import Role from "../models/RoleModel.js";
import Barrier from "../models/BarrierModel.js";
import PlaceCategory from "../models/PlaceCategoryModel.js";

// IDs must match the translation keys in the frontend (barriers.barrierN / categories.categoryN)
// and the default roleId (3) of new users.
const roles = [
    { id: 1, type: "admin" },
    { id: 2, type: "moderator" },
    { id: 3, type: "user" },
];

const barriers = [
    { id: 1, name: "Rollstuhlnutzende", selected: true },
    { id: 2, name: "Kinder", selected: true },
    { id: 3, name: "blinde Personen", selected: true },
    { id: 4, name: "gehörlose Personen", selected: true },
    { id: 5, name: "Personen mit nicht-deutscher Muttersprache", selected: true },
    { id: 6, name: "Personen mit Angststörungen", selected: true },
    { id: 7, name: "Personen mit kognitiven Einschränkungen", selected: true },
    { id: 8, name: "Personen mit Klaustrophobie", selected: true },
    { id: 9, name: "Hundehalter", selected: true },
];

const placeCategories = [
    { id: 1, name: "Restaurant", searchName: "restaurant", tag: "amenity", icon: "faUtensils", iconColor: "green", selected: true },
    { id: 2, name: "Klinik", searchName: "clinic", tag: "amenity", icon: "faHospital", iconColor: "red", selected: true },
    { id: 3, name: "Krankenhaus", searchName: "hospital", tag: "amenity", icon: "faHospital", iconColor: "red", selected: true },
    { id: 4, name: "Schule", searchName: "school", tag: "amenity", icon: "faSchool", iconColor: "blue", selected: true },
    { id: 5, name: "Museum", searchName: "museum", tag: "tourism", icon: "faLandmark", iconColor: "purple", selected: true },
    { id: 8, name: "Kinos", searchName: "cinema", tag: "amenity", icon: "faFilm", iconColor: "black", selected: true },
    { id: 9, name: "Cafes", searchName: "cafe", tag: "amenity", icon: "faMugHot", iconColor: "brown", selected: true },
    { id: 10, name: "Sehenswürdigkeiten", searchName: "attraction", tag: "tourism", icon: "faCamera", iconColor: "orange", selected: true },
];

// Explicit IDs do not advance Postgres' serial sequence, so move it past the highest ID
const resetSequence = async (model) => {
    if (sequelize.getDialect() !== "postgres") return;
    const table = model.getTableName();
    await sequelize.query(
        `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), (SELECT MAX(id) FROM "${table}"))`
    );
};

// Seeds a table only when it is empty, so existing data is never touched
const seedIfEmpty = async (model, rows) => {
    if ((await model.count()) > 0) return;
    await model.bulkCreate(rows);
    await resetSequence(model);
    console.log(`Seeded ${rows.length} rows into ${model.getTableName()}`);
};

export default async function seed() {
    await seedIfEmpty(Role, roles);
    await seedIfEmpty(Barrier, barriers);
    await seedIfEmpty(PlaceCategory, placeCategories);

    if (!(await Role.findByPk(3))) {
        console.warn("Warning: Role with id 3 (default role for new users) is missing - registration will fail.");
    }
}
