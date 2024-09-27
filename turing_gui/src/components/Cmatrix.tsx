import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// A line of characters falling together
const RainLine = ({ position, speed }: { position: number, speed: number }) => {
    const lineRef = useRef<any>();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

    // Generate a random sequence of characters for the line
    const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];
    const lineChars = useMemo(() => Array(10).fill(0).map(getRandomChar), []);

    // Move the line of characters down and reset its position when it falls off screen
    useFrame(() => {
        if (lineRef.current.position.y < -10) {
            lineRef.current.position.y = 10;  // Reset to the top
            lineRef.current.position.x = Math.random() * 20 - 10; // Random X position
            lineRef.current.position.z = Math.random() * 20 - 10; // Random Z position
        } else {
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
                    color={i === 0 ? 'white' : `hsl(120, 100%, ${80 - i * 5}%)`} // Brighter for the first character, fading down
                >
                    {char}
                </Text>
            ))}
        </group>
    );
};

const MatrixRain3D = () => {
    const createRainLines = () => {
        let rainArray = [];
        for (let i = 0; i < 50; i++) {
            const position = [
                Math.random() * 20 - 10, // Random X position
                Math.random() * 20 - 10, // Random Y position
                Math.random() * 20 - 10  // Random Z position
            ];
            const speed = Math.random() * 0.05 + 0.02;  // Different speeds for variety
            rainArray.push(<RainLine key={i} position={position} speed={speed} />);
        }
        return rainArray;
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

// export default App;
