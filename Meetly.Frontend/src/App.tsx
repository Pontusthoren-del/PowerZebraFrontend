import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
    return (
        <BrowserRouter>
            <h1> Hello Power Zebras! </h1> 
            <Home/>     
        </BrowserRouter>
    );
}
