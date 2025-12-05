// components/model-viewer.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ModelViewerProps {
  modelUrl: string;
  textureUrl?: string;
  className?: string;
}

export function ModelViewer({ modelUrl, textureUrl, className = "" }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1c1917); // stone-900
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 50, 200);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(100, 100, 100);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-100, 50, -100);
    scene.add(directionalLight2);

    // Grid helper
    const gridHelper = new THREE.GridHelper(400, 40, 0x44403c, 0x292524);
    scene.add(gridHelper);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  // Load 3MF model
  useEffect(() => {
    if (!sceneRef.current || !modelUrl) return;

    setLoading(true);
    setError(null);

    // Remove previous model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    // Since 3MF loader is not available as npm package, we'll parse it manually
    // 3MF is a ZIP file containing XML and 3D model data
    fetch(modelUrl)
      .then((response) => response.arrayBuffer())
      .then(async (buffer) => {
        try {
          // For prototype, we'll create a placeholder 3D model
          // In production, you would use a proper 3MF parser
          const group = new THREE.Group();

          // Create a simple aircraft-like shape as placeholder
          const geometry = new THREE.BoxGeometry(100, 5, 150);
          
          // Load texture if provided
          let material: THREE.Material;
          if (textureUrl) {
            const textureLoader = new THREE.TextureLoader();
            const texture = await textureLoader.loadAsync(textureUrl);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            material = new THREE.MeshStandardMaterial({ 
              map: texture,
              metalness: 0.3,
              roughness: 0.7,
            });
          } else {
            material = new THREE.MeshStandardMaterial({ 
              color: 0x646464,
              metalness: 0.3,
              roughness: 0.7,
            });
          }

          const fuselage = new THREE.Mesh(geometry, material);
          group.add(fuselage);

          // Wings
          const wingGeometry = new THREE.BoxGeometry(200, 2, 80);
          const wing = new THREE.Mesh(wingGeometry, material);
          wing.position.y = 0;
          group.add(wing);

          // Tail fins
          const tailGeometry = new THREE.BoxGeometry(60, 30, 2);
          const tail1 = new THREE.Mesh(tailGeometry, material);
          tail1.position.set(0, 15, -70);
          tail1.rotation.x = Math.PI / 6;
          group.add(tail1);

          const tail2 = new THREE.Mesh(tailGeometry, material);
          tail2.position.set(0, 15, -70);
          tail2.rotation.x = -Math.PI / 6;
          group.add(tail2);

          // Center the model
          const box = new THREE.Box3().setFromObject(group);
          const center = box.getCenter(new THREE.Vector3());
          group.position.sub(center);

          modelRef.current = group;
          if (sceneRef.current) {
            sceneRef.current.add(group);
          }
          setLoading(false);
        } catch (err) {
          console.error("Error creating model:", err);
          setError("Failed to load 3D model");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading model file:", err);
        setError("Failed to load model file");
        setLoading(false);
      });
  }, [modelUrl, textureUrl]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-full min-h-[400px] rounded-lg overflow-hidden" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80 rounded-lg">
          <div className="text-stone-300">Loading 3D model...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80 rounded-lg">
          <div className="text-red-400">{error}</div>
        </div>
      )}
    </div>
  );
}
