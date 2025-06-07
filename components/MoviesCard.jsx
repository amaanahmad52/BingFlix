import { Link } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

const MoviesCard = ({ movie }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <Link href={`/movie/${movie.id}`} asChild>
    <TouchableOpacity >
      
        <Image
          source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
          style={{ width: 110, height: 165 }}
           className="rounded-lg"
           resizeMode="cover"
        />
        {/* Optional title below the poster */}
       

    </TouchableOpacity>
    </Link>
  );
};

export default MoviesCard;
