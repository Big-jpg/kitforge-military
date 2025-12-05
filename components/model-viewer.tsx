// components/model-viewer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";

interface ModelViewerProps {
  modelUrl: string;
  textureUrl?: string;
  className?: string;
}

export function ModelViewer({
  modelUrl,
  textureUrl,
  className = "",
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x2a2a2a);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        50,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        1,
        1000
      );
      camera.position.set(150, 100, 150);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // Renderer setup with context loss handling
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Handle WebGL context loss
      renderer.domElement.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        console.log('WebGL context lost');
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      });

      renderer.domElement.addEventListener('webglcontextrestored', () => {
        console.log('WebGL context restored');
        animate();
      });

      // Orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 50;
      controls.maxDistance = 400;
      controls.target.set(0, 0, 0);
      controls.update();
      controlsRef.current = controls;

      // Lighting - simple and effective
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(50, 100, 50);
      scene.add(directionalLight);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(-50, 50, -50);
      scene.add(directionalLight2);

      // Animation loop
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          try {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          } catch (e) {
            console.error('Render error:', e);
          }
        }
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current)
          return;

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
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (rendererRef.current && containerRef.current) {
          try {
            containerRef.current.removeChild(rendererRef.current.domElement);
          } catch (e) {
            // Element might already be removed
          }
          rendererRef.current.dispose();
        }
        if (controlsRef.current) {
          controlsRef.current.dispose();
        }
      };
    } catch (e) {
      console.error('Failed to initialize 3D viewer:', e);
      setError('Failed to initialize 3D viewer');
      setLoading(false);
    }
  }, []);

  // Load 3MF model
  useEffect(() => {
    if (!sceneRef.current || !modelUrl) return;

    setLoading(true);
    setError(null);

    const loader = new ThreeMFLoader();

    loader.load(
      modelUrl,
      (group) => {
        console.log("3MF loaded, children:", group.children.length);

        // Remove previous model if exists
        if (modelRef.current && sceneRef.current) {
          sceneRef.current.remove(modelRef.current);
          modelRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else if (child.material) {
                child.material.dispose();
              }
            }
          });
        }

        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(group);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Center the model
        group.position.x = -center.x;
        group.position.y = -center.y;
        group.position.z = -center.z;

        // Scale to fit (target size 80 units)
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = 80 / maxDim;
          group.scale.setScalar(scale);
        }

        // Apply simple gray material to all meshes
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0x888888,
              flatShading: false,
              side: THREE.DoubleSide,
            });
          }
        });

        modelRef.current = group;
        if (sceneRef.current) {
          sceneRef.current.add(group);
        }

        setLoading(false);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percent = (xhr.loaded / xhr.total) * 100;
          console.log(`Loading: ${percent.toFixed(0)}%`);
        }
      },
      (error) => {
        console.error("Error loading 3MF:", error);
        setError("Failed to load 3D model");
        setLoading(false);
      }
    );
  }, [modelUrl]);

  // Apply texture when it changes
  useEffect(() => {
    if (!modelRef.current || !textureUrl) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        modelRef.current?.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const oldMaterial = child.material;
            
            child.material = new THREE.MeshPhongMaterial({
              map: texture,
              side: THREE.DoubleSide,
            });

            if (Array.isArray(oldMaterial)) {
              oldMaterial.forEach((mat) => mat.dispose());
            } else if (oldMaterial) {
              oldMaterial.dispose();
            }
          }
        });
      },
      undefined,
      (err) => console.error("Texture load error:", err)
    );
  }, [textureUrl]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
        style={{ background: '#2a2a2a' }}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/90 rounded-lg">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent"></div>
            <p className="mt-2 text-sm text-stone-300">Loading 3D model...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/90 rounded-lg">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 right-4 text-xs text-stone-400 bg-black/50 px-2 py-1 rounded">
        Use mouse to rotate, scroll to zoom
      </div>
    </div>
  );
}
