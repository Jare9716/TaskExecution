import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { store } from "@/store/store";

import Navigation from "@/navigation/navigation";

const App = () => {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<Navigation />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
