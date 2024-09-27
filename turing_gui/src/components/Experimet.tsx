import React, { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { Text, OrbitControls } from "@react-three/drei";
import { getTuringTrace } from "@/api";

// Types
interface TapeProps {
    tapeSymbols: string[];
    pointerLocation: number;
}

interface TraceStep {
    state: string;
    tapeSymbols: string[];
    pointerLocation: number;
}

// Tape Component
const Tape: React.FC<TapeProps> = ({ tapeSymbols, pointerLocation }) => {
    const cellWidth = 1;
    const { positionX } = useSpring({
        positionX: pointerLocation * -cellWidth,
        config: { tension: 200, friction: 20 },
    });

    return (
        <animated.group position-x={positionX}>
            {tapeSymbols.map((symbol, index) => (
                <mesh key={index} position={[index * cellWidth, 0, 0]}>
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshStandardMaterial color={index === pointerLocation ? "orange" : "gray"} />
                    <Text
                        position={[0, 0, 0.06]}
                        fontSize={0.5}
                        color="white"
                    >
                        {symbol}
                    </Text>
                </mesh>
            ))}
        </animated.group>
    );
};

// Utility function to parse trace
const parseTrace = (traceItem: string): TraceStep => {
    const [state, tapeArrayStr, pointr] = traceItem.split(":");
    const tapeString = tapeArrayStr.match(/\[(.*?)\]/)?.[1] || "";
    const tapeSymbols = tapeString.split(",").map((s) => s.trim().replace(/['"]+/g, ""));
    const pointerLocation = parseInt(pointr);
    return { state, tapeSymbols, pointerLocation };
};

// Main TuringMachine component
const TuringMachine: React.FC = () => {
    const [trace, setTrace] = useState<string[]>([]);
    const [accepted, setAccepted] = useState<boolean | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentTape, setCurrentTape] = useState<string[]>([]);
    const [pointer, setPointer] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch trace data
    useEffect(() => {
        const fetchTrace = async () => {
            try {
                setIsLoading(true);
                const [traceData, isAccepted] = await getTuringTrace();
                setTrace(traceData);
                setAccepted(isAccepted);
            } catch (error) {
                console.error("Error fetching Turing trace:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrace();
    }, []);

    // Update current state based on trace step
    const updateCurrentState = useCallback(() => {
        if (trace.length > 0) {
            const { tapeSymbols, pointerLocation } = parseTrace(trace[currentStep]);
            setCurrentTape(tapeSymbols);
            setPointer(pointerLocation);
        }
    }, [trace, currentStep]);

    useEffect(() => {
        updateCurrentState();
    }, [updateCurrentState]);

    // Auto-advance steps
    useEffect(() => {
        if (isLoading || trace.length === 0) return;

        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % trace.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading, trace]);

    if (isLoading) {
        return <div>Loading Turing machine simulation...</div>;
    }

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Tape tapeSymbols={currentTape} pointerLocation={pointer} />
                <OrbitControls />
            </Canvas>
            <div style={{ position: "absolute", top: 70, left: 30, color: "white" }}>
                Step: {currentStep + 1} / {trace.length}
                <br />
                State: {parseTrace(trace[currentStep]).state}
                <br />
                Accepted: {accepted === null ? "Running" : accepted ? "Yes" : "No"}
            </div>
        </div>
    );
};

export default TuringMachine;
