import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../constants/images';

const TrendingMoviesCard = ({ movie, index }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="pl-2 relative">
        <Image
          source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
          className="rounded-lg w-32 h-48"
          resizeMode="cover"
        />

        <View className="absolute bottom-4 -left-3 px-2 py-1">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              style={{ width: 56, height: 56 }} // size-14 = 56px
              resizeMode="cover"
            />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingMoviesCard;
