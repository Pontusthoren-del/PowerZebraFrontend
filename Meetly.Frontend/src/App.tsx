import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
    return (
        <BrowserRouter>
            <h1> Hello Power Zebras! </h1> 
            <AppRoutes/>     
        </BrowserRouter>
    );
}
