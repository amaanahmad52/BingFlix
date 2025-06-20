import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { getMovies } from "../../backend_services/api";
import { updateSearchCount } from "../../backend_services/appwriteBackend";
import MoviesCard from "../../components/MoviesCard";
import SearchBar from "../../components/searchBar";
import { images } from "../../constants/images";
import useFetch from "../../hooks/useFetch";

const Search = () => {
  const [searchItem, setSearchItem] = useState("");

  const {
    data: moviesData,
    loading,
    error,
    reset,
    refetch: loadMovies,
  } = useFetch({
    fetchingFunction: () => getMovies({ query: searchItem }),
    // autoFetch: false, //do not fetch on loading component
  });
  useEffect(() => {
    //debouncung search by giving it some time. so api will not get called by each key stroke
    const func = setTimeout(async () => {
     
      if (searchItem) {
        await loadMovies(); //will fetch on having a searchItem by user
        
      } else {
        reset();
      }
    }, 600);
    return () => clearTimeout(func);
  }, [searchItem]);

  useEffect(()=>{
  
      if(moviesData?.length>0 && moviesData?.[0]){
        // console.log("ok")
        updateSearchCount(searchItem,moviesData[0])
      }
    
    
  },[moviesData])


  const handleSearch = async () => {
    // await loadMovies();
  };
  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 mt-40 flex-col">
        <SearchBar
          placeholder="Search a Movie"
          value={searchItem}
          setValue={setSearchItem}
          handleSearch={handleSearch}
        />
        {moviesData ? (
          <>
            <FlatList
              data={moviesData}
              renderItem={({ item }) => <MoviesCard movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 10,
                flexGrow: 1,
              }}
              numColumns={4}
              ListHeaderComponent={() =>
                moviesData.length > 0 && (
                  <Text className="text-lg font-bold mt-5 mb-3 text-neutral-500">
                    Search results for {searchItem}
                  </Text>
                )
              }
              ListEmptyComponent={() =>
                !loading &&
                !error && (
                  <View
                    style={{
                        padding: 100,
                      justifyContent: "center",
                      alignItems: "center",
                     
                    }}
                  >
                    <Text className="text-lg text-white">No movies found</Text>
                  </View>
                )
              }
            />
          </>
        ) : (
          <Spinner />
        )}
      </View>
    </View>
  );
};

export default Search;
