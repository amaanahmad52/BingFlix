import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StatusBar, Text, View, } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { getMovies, getMoviesWithgenre } from "../../backend_services/api";
import MoviesCard from "../../components/MoviesCard";
import SearchBar from "../../components/searchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import useFetch from "../../hooks/useFetch";

const Index = () => {
  const router = useRouter();

  // SEARCHING MOVIE
  const [value, setValue] = useState("");
  const handleSearch = () => {
    router.push(`/search`);
  };

  // GETTING MOVIES FOR HOMEPAGE
  const {
    data: moviesData,
    loading,
    error,
  } = useFetch({
    fetchingFunction: () => getMovies({ query: "" }),
  });


  //create a map to get the genre id
  const getGenre = {Action: 28,Adventure: 12,Animation: 16,Comedy: 35,Crime: 80,Documentary: 99,Drama: 18,Family: 10751,Fantasy: 14,History: 36,Horror: 27,Music: 10402,Mystery: 9648,Romance: 10749,"Science Fiction": 878,"TV Movie": 10770,Thriller: 53,War: 10752,Western: 3,};
  //GETTING MOVIES FOR HOMEPAGE
  // NEW STATE FOR MULTIPLE GENRES
  const [genreMovies, setGenreMovies] = useState({});

  useEffect(() => {
    const fetchAllGenreMovies = async () => {
      const result = {};
      for (const genreName in getGenre) {
        const genreNumber = getGenre[genreName];
        try {
          const data = await getMoviesWithgenre({ genreNumber });
          result[genreName] = data;
        } catch (err) {
          console.log(`Error fetching ${genreName}:`, err.message);
        }
      }
      setGenreMovies(result);
    };

    fetchAllGenreMovies();
  }, []);
  return (
    <View className="flex-1 bg-primary">
      <StatusBar backgroundColor="#030014" translucent={false} />
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading || !moviesData || !genreMovies? (
          <Spinner visible={true} />
        ) : error ? (
          <Text className="text-red-500 text-center py-4">{error.message}</Text>
        ) : (
          // if no loading and no error, show the actual content
          <View className="flex-1 mt-1 flex-col">
            <SearchBar
              placeholder="Search a Movie"
              value={value}
              setValue={setValue}
              handleSearch={handleSearch}
            />

            {/* <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text> */}
            {moviesData && (
              <View className="mb-6">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Popular Movies
                </Text>
                <FlatList
                  data={moviesData}
                  renderItem={({ item }) => <MoviesCard movie={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: 10,
                  }}
                  className="ml-0"
                />
              </View>
            )}
            {Object.entries(genreMovies).map(([genreName, movies]) => (
              <View key={genreName} className="mb-6">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  {genreName} Movies
                </Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => <MoviesCard movie={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
