import { connectDB } from "./db.js";

const run = async () => {
    const db = await connectDB();
    const users = db.collection("users");

    // CREATE
    const newUser = { name: "Alice", email: "alice@mail.com", age: 20 };
    const { insertedId } = await users.insertOne(newUser);
    console.log("Добавлен пользователь:", insertedId);

    // READ
    const user = await users.findOne({ name: "Alice" });
    console.log("Найден:", user);

    // UPDATE
    await users.updateOne({ _id: insertedId }, { $set: { age: 21 } });
    console.log("Возраст обновлён");

    // DELETE
    await users.deleteOne({ _id: insertedId });
    console.log("Удалён");
};

run();
