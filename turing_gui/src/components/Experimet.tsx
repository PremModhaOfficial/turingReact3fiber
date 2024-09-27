import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei"; // Import Text from @react-three/drei

// Define types for tape symbols and trace steps
interface TapeProps {
    tapeSymbols: string[];
    pointerLocation: number;
}

interface TraceStep {
    state: string;
    tapeSymbols: string[];
    pointerLocation: number;
}

// Tape Component to display 3D tape symbols
const Tape: React.FC<TapeProps> = ({ tapeSymbols, pointerLocation }) => {
    const cellWidth = 1; // Width of each tape cell

    // Calculate position offset based on pointer location
    const { positionX } = useSpring({
        positionX: pointerLocation * -cellWidth, // Moves tape based on pointer location
        config: { tension: 200, friction: 20 },
    });

    return (
        <animated.group position-x={positionX}>
            {tapeSymbols.map((symbol, index) => (
                <mesh key={index} position={[index * cellWidth, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={index === pointerLocation ? "orange" : "gray"} />
                    <Text3D content={symbol} />
                </mesh>
            ))}
        </animated.group>
    );
};

// Text component to display the symbol on each tape cell using Drei's Text
const Text3D: React.FC<{ content: string }> = ({ content }) => {
    return (
        <Text
            position={[0, 0, 0.6]} // Positioning the text
            fontSize={0.5} // Font size
            color="white" // Text color
        >
            {content}
        </Text>
    );
};

// Example trace data
const trace: string[] = [
    "q0:['*', '*', '1', '0', '0', '1', '*', '*']:2",
    "q0:['*', '*', '0', '0', '0', '1', '*', '*']:3",
    "q0:['*', '*', '1', '0', '0', '1', '*', '*']:2",
    "q0:['*', '*', '0', '0', '0', '1', '*', '*']:3",
    "q0:['*', '*', '0', '1', '0', '1', '*', '*']:4",
    "q0:['*', '*', '0', '1', '1', '1', '*', '*']:5",
    "q1:['*', '*', '0', '1', '1', '0', '*', '*']:6",
    "q0:['*', '*', '0', '1', '1', '0', '*', '*']:5",
    "q2:['*', '*', '0', '1', '1', '1', '*', '*']:6",
    "q1:['*', '*', '0', '1', '1', '1', '*', '*']:6",
    "q1:['*', '*', '0', '1', '1', '1', '*', '*']:5",
    "q1:['*', '*', '0', '1', '1', '1', '*', '*']:4",
    "q1:['*', '*', '0', '1', '1', '1', '*', '*']:3",
    "q1:['*', '*', '0', '1', '1', '1', '*', '*']:2",
    "q2:['*', '*', '*', '0', '1', '1', '1', '*', '*']:2",
];

// Function to parse the trace format into state, tape, and pointer
const parseTrace = (traceItem: string): TraceStep => {
    let [state, tapeArrayStr, pointr] = traceItem.split(":");
    const tapeString = tapeArrayStr.match(/\[(.*?)\]/)?.[1] || ""; // Extract tape symbols
    const tapeSymbols = tapeString.split(",").map((s) => s.trim().replace(/['"]+/g, "")); // Clean up symbols
    // let [dynamicTrace, setTrace] = useState(trace)



    let pointerLocation = parseInt(pointr)
    return { state, tapeSymbols, pointerLocation };
};

const TuringMachine: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentTape, setCurrentTape] = useState<string[]>([]);
    const [pointer, setPointer] = useState<number>(0);

    // Update the tape and pointer according to the current trace step
    useEffect(() => {
        const { tapeSymbols, pointerLocation } = parseTrace(trace[currentStep]);
        setCurrentTape(tapeSymbols);
        setPointer(pointerLocation);
    }, [currentStep]);

    // Automatically move to the next step every second (for demo purposes)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % trace.length); // Loop through the trace
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <h1 >3D Turing Machine Tape Trace</h1>
            <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Tape tapeSymbols={currentTape} pointerLocation={pointer} />
            </Canvas>
        </div>
    );
};

export default TuringMachine;
