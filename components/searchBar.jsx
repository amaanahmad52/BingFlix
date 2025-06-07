import { Image, TextInput, View } from 'react-native';
import { icons } from '../constants/icons';

const SearchBar=({ placeholder, value, setValue, handleSearch })=>{
   
    return(
        <View className="flex-row items-center  bg-dark-200 rounded-full px-5 py-4 ">
            <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor="#AB8BFF"
            />
            <TextInput
                onSubmitEditing={handleSearch}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={{ flex: 1, marginLeft: 8, color: '#FFFFFF' }}
                placeholderTextColor="#A8B5DB"
            />
            <Image
                onTouchEnd={() => setValue("")} 
                source={icons.close}
                style={{ width: 30, height: 30, marginBottom: 2 }}
                resizeMode="contain"
                tintColor="#AB8BFF"
            />

       </View>
    );
}
export default SearchBar