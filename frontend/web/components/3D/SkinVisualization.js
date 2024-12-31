import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useTheme } from '../../context/ThemeContext';

const SkinVisualization = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create DNA helix structure
    const createDNAStrand = () => {
      const points = [];
      const height = 4;
      const turns = 3;
      
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const angle = turns * Math.PI * 2 * t;
        
        // First strand
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * 0.8,
            height * (t - 0.5),
            Math.sin(angle) * 0.8
          )
        );
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
      const material = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x66a1ff : 0x4299e1,
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });
      
      return new THREE.Mesh(tubeGeometry, material);
    };

    // Create two DNA strands
    const strand1 = createDNAStrand();
    const strand2 = createDNAStrand();
    strand2.rotation.y = Math.PI;
    scene.add(strand1);
    scene.add(strand2);

    // Add spheres at connection points
    const createConnectors = () => {
      const group = new THREE.Group();
      const turns = 3;
      const count = 10;

      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const angle = turns * Math.PI * 2 * t;
        const height = 4 * (t - 0.5);

        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshPhongMaterial({
          color: isDarkMode ? 0x90cdf4 : 0x63b3ed,
          shininess: 100
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
          Math.cos(angle) * 0.8,
          height,
          Math.sin(angle) * 0.8
        );
        group.add(sphere);
      }

      return group;
    };

    const connectors = createConnectors();
    scene.add(connectors);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 6;

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire structure
      strand1.rotation.y += 0.003;
      strand2.rotation.y += 0.003;
      connectors.rotation.y += 0.003;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = 400;
      const height = 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div 
      ref={mountRef} 
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  );
};

export default SkinVisualization;
