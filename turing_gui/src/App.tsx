import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./components/WellCome";
import TuringMachine from "./components/Experimet";
import { useEffect, useState } from "react";
import SetOfVariables from "./components/SetOfVariables";
import BlankSymbolPage from "./components/BlankSymbol";
import { Button } from "@/components/ui/button"
import Table from "./components/Table";
import TapeStringPage from "./components/TapeString";
import Navbar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeProvider";


export default function App() {

    let [blank, setBlank] = useState<string>("");
    let [pblank, setpBlank] = useState<string>(blank);
    let [vars, setVariables] = useState<string[]>([]);
    let [stats, setStates] = useState<string[]>([]);

    let [tapeString, setTapeString] = useState<string>("");


    useEffect(() => {
        let n = vars.filter((a) => a !== pblank)
        setVariables([...n, blank])
        setpBlank(blank)
    }, [blank])

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<WelcomeScreen />} />
                    <Route path="/config" element={
                        <>
                            <BlankSymbolPage usestate={[blank, setBlank]} />
                            <SetOfVariables
                                usestate={[vars, setVariables]}
                                blankSymbol={blank}
                                header={`Variables`}
                            />
                            <SetOfVariables
                                usestate={[stats, setStates]}
                                blankSymbol={blank}
                                header={`States`} />
                            <TapeStringPage
                                usestate={[tapeString, setTapeString]}
                                alphabet={vars}
                                blankSymbol={blank}
                            />
                            <Table vars={vars} states={stats} />
                            <center> <Link to={'/animate'}><Button>ANIMATE</Button></Link> </center>
                        </>
                    } />
                    <Route path="/animate" element={<TuringMachine />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
