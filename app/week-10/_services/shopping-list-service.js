import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc } from "firebase/firestore";

// Fetch items for the given userId
export async function getItems(userId) {
  try {
    const items = [];
    const q = query(collection(db, `users/${userId}/items`)); // Query the user's items collection
    const querySnapshot = await getDocs(q); // Fetch the documents
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() }); // Add each item to the array
    });
    return items; // Return the array of items
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

// Add a new item to the user's items collection
export async function addItem(userId, item) {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/items`), item); // Add the document
    return docRef.id; // Return the new item's ID
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

// Clear all items for the given userId
export async function clearItems(userId) {
  try {
    const itemsRef = collection(db, `users/${userId}/items`); // Reference to the user's items collection
    const snapshot = await getDocs(itemsRef); // Fetch all items

    const deletePromises = snapshot.docs.map((docSnap) => {
      const itemDoc = doc(db, `users/${userId}/items`, docSnap.id);
      return deleteDoc(itemDoc); // Delete each document
    });

    await Promise.all(deletePromises); // Wait for all deletions to complete
    return true; // Indicate success
  } catch (error) {
    console.error("Error clearing items:", error);
    throw error;
  }
}
