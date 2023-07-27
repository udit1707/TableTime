import { Provider } from "react-redux";
import { LoadScript } from "@react-google-maps/api";
import { store, wrapper } from "../store/store";
import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </LoadScript>
  );
};

export default wrapper.withRedux(App);
