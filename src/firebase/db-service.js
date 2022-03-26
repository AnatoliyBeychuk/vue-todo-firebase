import { db, auth } from "../firebase/db";

const database = "database";

export const getAllTaskInCollection = async (
  collection,
  sortBy,
  sortOption
) => {
  const data = await db
    .collection(database)
    .doc(auth.currentUser.email)
    .collection(collection)
    .orderBy(sortBy, sortOption)
    .get();
  return data;
};

export const addTaskToCollection = async (collection, data) => {
  await db
    .collection(database)
    .doc(auth.currentUser.email)
    .collection(collection)
    .add(data);
};

export const deleteTaskFromCollection = async (collection, id) => {
  await db
    .collection(database)
    .doc(auth.currentUser.email)
    .collection(collection)
    .doc(id)
    .delete();
};

export const getTaskById = (data, id) => {
  const [doc] = data.docs.filter((doc) => doc.data().id === id);
  return doc;
};

export const getAllTasks = async (collection, sortBy, sortOption, list) => {
  const data = await getAllTaskInCollection(collection, sortBy, sortOption);
  list.value = data.docs.map((doc) => doc.data());
};
