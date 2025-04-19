import { StyleSheet } from "react-native";
import { View, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../constants/style";

function LoadOverlayatStart() {
    return (<View style={styles.container}>
        <ActivityIndicator size='large' color="white" />
    </View>)

}

export default LoadOverlayatStart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary500,
    }
})