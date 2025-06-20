import { Client, Databases, ID, Query } from "react-native-appwrite";

const database_id = "68516bdc00255b47d5aa";
const appwrite_project_id = "6817ad05003d3883b737";
const collection_id = "68516c01002b068051b0";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(appwrite_project_id);

const database = new Databases(client);

export const updateSearchCount = async (searchItem, movie) => {
  try {
    // Check if SEARCH_ITEM already exists
    const result = await database.listDocuments(database_id, collection_id, [
      Query.equal("SEARCH_ITEM", searchItem),
    ]);
    // console.log("hi")
    if (result.documents.length > 0) {

      // If it exists, increment count
      const document = result.documents[0];
      await database.updateDocument(
        database_id,
        collection_id,
        document.$id,
        {
          count: document.count + 1,
        }
      );
    } else {
      // If not, create new document
      await database.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        {
          title: movie.title,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          id: movie.id,
          SEARCH_ITEM: searchItem,
          count: 1,
        }
      );
    }
  } catch (error) {
    console.error("Failed to update search count:", error);
  }
};

export const getTrendingMovies=async()=>{
    try {
      const result = await database.listDocuments(database_id, collection_id,[
        Query.orderDesc('count'),
        Query.limit(10)
      ]);
      return result.documents
    } catch (error) {
      console.error("Failed to get Trending Movies:", error);
    }
}
