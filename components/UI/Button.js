import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Button({ children, onPress, mode, style }) {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                android_ripple={{ color: GlobalStyles.colors.primary300 }}
                style={({ pressed }) => [
                    styles.base,
                    mode === 'flat' && styles.flat,
                    pressed && Platform.OS === 'ios' && styles.pressed, // iOS feedback only
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        mode === 'flat' && styles.flatText,
                    ]}
                >
                    {children}
                </Text>
            </Pressable>
        </View>
    );
}

export default Button;


const styles = StyleSheet.create({
    base: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: GlobalStyles.colors.primary500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    flatText: {
        color: GlobalStyles.colors.primary700,
    },
    pressed: {
        opacity: 0.75, // For iOS
    },
});
