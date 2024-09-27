import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { compressSync } from "three/examples/jsm/libs/fflate.module.js";
import { instance, string } from "three/webgpu";

let exapleTrace = [
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
    "q2:['*', '*', '*', '0', '1', '1', '1', '*', '*']:2"
]

function TapeHead({ position }: any) {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={"red"} />
        </mesh>
    );
}

function TuringMachineAnimation({ trace = exapleTrace }: { trace: string[] }) {
    const [currentPosition, setCurrentPosition] = useState([0, 0, 0]);

    // Simulate tape head movement based on trace
    useEffect(() => {
        if (trace instanceof Array && trace.length > 0) {
            let index = 0;
            const interval = setInterval(() => {
                if (index < trace.length) {
                    // Update the tape head's position based on the current state
                    console.log(trace[index].split(':'))
                    setCurrentPosition([parseInt(trace[index].split(':')[2]), 0, 0]);
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [trace]);

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <TapeHead position={currentPosition} />
        </Canvas>
    );
}

type TapeProps = {
    tape: string[]
    pointer: number
}
function Tape({ tape, pointer }: TapeProps) {


    return (
        <canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

        </canvas>
    )
}

export default TuringMachineAnimation
