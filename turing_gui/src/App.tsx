import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import Tab from "./components/Tab";
import WelcomeScreen from "./components/WellCome";
import TuringMachine from "./components/Experimet";
import { useState } from "react";
import SetOfVariables from "./components/SetOfVariables";
import BlankSymbolPage from "./components/BlankSymbol";
import { Button } from "@/components/ui/button"


export default function App() {

    let [blank, setBlank] = useState<string>("");
    let [variables, setVariables] = useState<string[]>([]);
    let [states, setStates] = useState<string[]>([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/config" element={
                    <>
                        <BlankSymbolPage usestate={[blank, setBlank]} />
                        <SetOfVariables usestate={[variables, setVariables]} header={`Variables`} />
                        <SetOfVariables usestate={[states, setStates]} header={`states`} />
                        <center> <Link to={'/animate'}><Button>ANIMATE</Button></Link> </center>
                    </>
                } />
                <Route path="/animate" element={<TuringMachine />} />
            </Routes>
        </BrowserRouter>
    );
}
