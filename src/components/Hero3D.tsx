"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const isMobile = width < 640;
    const cameraZ = isMobile ? 32 : width < 1024 ? 26 : 22;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Shield Group
    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // Shield Shape Geometry (Hexagonal faceted cyber shield)
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 5);
    shieldShape.lineTo(4.5, 3.2);
    shieldShape.lineTo(4.2, -1.8);
    shieldShape.lineTo(0, -5.5);
    shieldShape.lineTo(-4.2, -1.8);
    shieldShape.lineTo(-4.5, 3.2);
    shieldShape.closePath();

    const extrudeSettings = {
      depth: 0.8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.3,
      bevelThickness: 0.4,
    };

    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeometry.center();

    // Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF2A3D,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const shieldMesh = new THREE.Mesh(shieldGeometry, wireframeMaterial);
    shieldGroup.add(shieldMesh);

    // Outer Edge Glow lines
    const edges = new THREE.EdgesGeometry(shieldGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xFF6B7A,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });
    const edgeLines = new THREE.LineSegments(edges, lineMaterial);
    shieldGroup.add(edgeLines);

    // 3. Central Core Lock (Torus ring + Keyhole block)
    const lockGroup = new THREE.Group();
    const torusGeom = new THREE.TorusGeometry(1.6, 0.18, 16, 32);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const lockRing = new THREE.Mesh(torusGeom, torusMat);
    lockGroup.add(lockRing);

    const coreBoxGeom = new THREE.BoxGeometry(1.4, 1.4, 0.8);
    const coreBoxMat = new THREE.MeshBasicMaterial({
      color: 0xFF2A3D,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreBox = new THREE.Mesh(coreBoxGeom, coreBoxMat);
    coreBox.position.z = 0.2;
    lockGroup.add(coreBox);

    shieldGroup.add(lockGroup);

    // 4. Orbiting Particle Network
    const particleCount = 240;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 6.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFF2A3D,
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Mouse Interaction Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.65;
      mouse.targetY = y * 0.65;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!prefersReducedMotion) {
        // Base floating rotation + mouse rotation
        shieldGroup.rotation.y = mouse.x * 1.2 + Math.sin(elapsedTime * 0.8) * 0.12;
        shieldGroup.rotation.x = -mouse.y * 1.0 + Math.cos(elapsedTime * 0.7) * 0.08;

        lockRing.rotation.z = elapsedTime * 0.8;
        coreBox.rotation.y = -elapsedTime * 1.2;

        particles.rotation.y = elapsedTime * 0.08 + mouse.x * 0.4;
        particles.rotation.x = mouse.y * 0.3;

        // Subtle particle pulse
        const posArray = particleGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          posArray[i] += velocities[i];
          posArray[i + 1] += velocities[i + 1];
          posArray[i + 2] += velocities[i + 2];

          // Boundary check
          const dist = Math.sqrt(
            posArray[i] ** 2 + posArray[i + 1] ** 2 + posArray[i + 2] ** 2
          );
          if (dist > 14 || dist < 4.5) {
            velocities[i] *= -1;
            velocities[i + 1] *= -1;
            velocities[i + 2] *= -1;
          }
        }
        particleGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      shieldGeometry.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[600px] flex items-center justify-center pointer-events-none"
      aria-label="Interactive 3D Cyber Shield wireframe visualization"
    />
  );
}
