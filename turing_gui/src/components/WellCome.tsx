import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { useNavigate } from 'react-router-dom'
import { assert } from 'console'

interface Particle {
    time: number
    factor: number
    speed: number
    x: number
    y: number
    z: number
    char: string
}

const TuringTape: React.FC = () => {
    const ref = useRef<THREE.Group>(null)
    useFrame((state) => {
        if (ref.current) {
            ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2
        }
    })
    return (
        <group ref={ref}>
            {[-2, -1, 0, 1, 2].map((x) => (
                <Box key={x} position={[x, 0, 0]} args={[0.9, 0.9, 0.1]}>
                    <meshStandardMaterial color="#ffffff" />
                </Box>
            ))}
        </group>
    )
}

const AnimatedSphere: React.FC = () => {
    const ref = useRef<THREE.Mesh>(null)
    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
        }
    })
    return (
        <Sphere ref={ref} args={[0.5, 32, 32]} position={[0, 2, 0]}>
            <meshStandardMaterial color="#ff6b6b" />
        </Sphere>
    )
}

const MatrixRain: React.FC = () => {
    const count = 500
    const ref = useRef<THREE.InstancedMesh>(null)
    const [font, setFont] = useState<Font | null>(null)

    useEffect(() => {
        const loader = new FontLoader()
        loader.load('/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
            setFont(loadedFont)
        })
    }, [])
    const particles = useMemo<Particle[]>(() => {
        const temp = []
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789αβγδεζηθικλμνξοπρστυφχψω'
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.3 + Math.random() / 2
            const x = (Math.random() - 0.5) * 50
            const y = Math.random() * 100 - 50
            const z = (Math.random() - 0.5) * 50
            const char = chars[Math.floor(Math.random() * chars.length)]
            temp.push({ time, factor, speed, x, y, z, char })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const charGeometries = useMemo(() => {
        if (!font) return null
        const geometries: { [key: string]: THREE.BufferGeometry } = {}
        particles.forEach((particle) => {
            if (!geometries[particle.char]) {
                geometries[particle.char] = new TextGeometry(particle.char, {
                    font,
                    size: 0.5,
                    height: 0.1,
                })
            }
        })
        return geometries
    }, [font, particles])

    useFrame(() => {
        if (!ref.current || !charGeometries) return

        particles.forEach((particle, i) => {
            let { time, factor, speed, x, y, z, char } = particle
            time = particle.time += speed / 2
            const s = Math.cos(time)
            dummy.position.set(
                x,
                y - factor / 2 - (factor / 2) * Math.sin(time * speed),
                z
            )
            dummy.scale.set(1, 1 + s, 1)
            dummy.updateMatrix()
            ref.current.setMatrixAt(i, dummy.matrix)

            if (charGeometries[char]) {
                ref.current.geometry = charGeometries[char]
            }
        })
        ref.current.instanceMatrix.needsUpdate = true
    })

    if (!font || !charGeometries) return null

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, count]}>
            <bufferGeometry attach="geometry" {...charGeometries['A']} />
            <meshBasicMaterial attach="material" color="#00ff00" />
        </instancedMesh>
    )
}

const WelcomeScreen: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Text
                    position={[0, 2, 0]}
                    fontSize={2}
                    color="#4ecdc4"
                    anchorX="center"
                    anchorY="middle"
                    onClick={() => navigate("/config")}
                >
                    Turing Machine
                </Text>
                <TuringTape />
                <AnimatedSphere />
                <MatrixRain />
            </Canvas>
        </div>
    )
}

export default WelcomeScreen
