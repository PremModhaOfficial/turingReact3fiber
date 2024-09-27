import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import TuringMoveInput from './TuringMoveInput';
import * as THREE from 'three';
import Table from './Table';

// Random character generator
const randomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
};

// A single falling line of characters
const RainLine = ({ position, speed }: any) => {
    const lineRef = useRef<any>();
    const [lineChars, setLineChars] = useState(
        Array.from({ length: 20 }, () => randomChar())
    );

    // Periodically change characters in the line (simulate cmatrix)
    useEffect(() => {
        const interval = setInterval(() => {
            setLineChars((chars) =>
                chars.map((char, i) =>
                    Math.random() > 0.9 ? randomChar() : char
                )
            );
        }, 100); // Change characters every 100ms

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Move the entire line down over time
    useFrame(() => {
        if (lineRef.current.position.y < -10) {
            // Reset the line to the top, but keep it within bounds
            lineRef.current.position.y = 10;
            lineRef.current.position.x = Math.random() * 20 - 10;
            lineRef.current.position.z = Math.random() * 20 - 10;
        } else {
            // Move down at a constant speed
            lineRef.current.position.y -= speed;
        }
    });

    return (
        <group ref={lineRef} position={position}>
            {lineChars.map((char, i) => (
                <Text
                    key={i}
                    position={[0, -i * 0.6, 0]}  // Stack characters vertically
                    fontSize={0.5}
                    color={i === 0 ? 'white' : `hsl(120, 100%, ${80 - i * 5}%)`} // Fade effect
                >
                    {char}
                </Text>
            ))}
        </group>
    );
};

const MatrixRain3D = () => {
    // Create multiple lines of falling characters
    const createRainLines = () => {
        const rainLines = [];
        for (let i = 0; i < 100; i++) {
            const position = [
                Math.random() * 20 - 10, // X position
                Math.random() * 20 - 10, // Y position
                Math.random() * 20 - 10  // Z position
            ];
            const speed = Math.random() * 0.05 + 0.02;  // Random speed for each line
            rainLines.push(<RainLine key={i} position={position} speed={speed} />);
        }
        return rainLines;
    };

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {createRainLines()}
        </Canvas>
    );
};

const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
            <MatrixRain3D />
        </div>
    );
};

export default App;
