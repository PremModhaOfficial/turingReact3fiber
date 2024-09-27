import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
const randomChar = () => characters[Math.floor(Math.random() * characters.length)];
const RainChar = ({ char, position, speed }: any) => {
    const meshRef = useRef<any>();
    let chage = 0

    // Move the character down at a constant speed
    useFrame(() => {
        if (meshRef.current.position.y < -10) {
            meshRef.current.position.y = 10;  // Reset to the top
            meshRef.current.position.x = Math.random() * 10 - 5; // Random X position
            meshRef.current.position.z = Math.random() * 10 - 5; // Random Z position
        } else {
            meshRef.current.position.y -= speed;
            chage += 1
        }
    });

    let [dynamic_char, setChar] = useState(char)
    useEffect(() => {
        setChar(randomChar)
    }, [chage])


    return (
        <Text ref={meshRef} position={position} fontSize={0.2} color="green">
            {dynamic_char}
        </Text>
    );
};

const MatrixRain = () => {

    const createRain = () => {
        let rainArray = [];
        for (let i = 0; i < 1000; i++) {
            const position = [
                Math.random() * 10 - 5, // Random X position
                Math.random() * 20 - 10, // Random Y position
                Math.random() * 10 - 5, // Random Z position
            ];
            const speed = Math.random() * 0.05 + 0.02;
            rainArray.push(<RainChar key={i} char={randomChar()} position={position} speed={speed} />);
        }
        return rainArray;
    };

    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {createRain()}
        </Canvas>
    );
};

const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
            <MatrixRain />
        </div>
    );
};

export default App;
