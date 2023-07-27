import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export async function getOutletsFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "outlets"));

    const outlets = [];
    querySnapshot.forEach((doc) => {
      outlets.push(doc.data());
    });

    return outlets;
  } catch (error) {
    console.error("Error retrieving outlets data:", error);
    return [];
  }
}
