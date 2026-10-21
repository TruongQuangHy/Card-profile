"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolio } from "@/context/PortfolioContext";

const SHAPES = [
  { core: () => new THREE.IcosahedronGeometry(5.4, 1), wire: () => new THREE.IcosahedronGeometry(5.65, 1) },
  { core: () => new THREE.TorusKnotGeometry(3.7, 1.05, 140, 18), wire: () => new THREE.TorusKnotGeometry(3.85, 1.1, 90, 12) },
  { core: () => new THREE.OctahedronGeometry(5.6, 2), wire: () => new THREE.OctahedronGeometry(5.85, 1) },
];

/**
 * Hero backdrop. Renders only while the hero is on screen and the tab is visible,
 * fades out with scroll, and draws a single still frame under reduced motion.
 */
export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { themeConfig, shapeIndex } = usePortfolio();

  const api = useRef<{
    setColor: (hex: number) => void;
    setShape: (i: number) => void;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isSmall, powerPreference: "low-power" });
    } catch {
      canvas.style.display = "none";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 26;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.PointLight(themeConfig.hex, 3, 120);
    keyLight.position.set(14, 14, 16);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x8a96b0, 1.6, 120);
    rimLight.position.set(-16, -12, -8);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    const coreMat = new THREE.MeshStandardMaterial({ color: 0x141924, roughness: 0.32, metalness: 0.75, flatShading: true });
    const wireMat = new THREE.MeshBasicMaterial({ color: themeConfig.hex, wireframe: true, transparent: true, opacity: 0.28 });
    const core = new THREE.Mesh(SHAPES[0].core(), coreMat);
    const wire = new THREE.Mesh(SHAPES[0].wire(), wireMat);
    group.add(core, wire);

    const ringGeo = new THREE.TorusGeometry(10, 0.03, 8, 160);
    const ringMat = new THREE.MeshBasicMaterial({ color: themeConfig.hex, transparent: true, opacity: 0.22 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.6;
    group.add(ring);

    const count = isSmall ? 260 : 520;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 10;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.09, color: 0xc9d2e3, transparent: true, opacity: 0.45, sizeAttenuation: true });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Place the object to the right of the copy on wide screens, behind it on narrow ones.
    const layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      const wide = w >= 1024;
      group.position.set(wide ? 9.5 : 0, wide ? 0.5 : 5, 0);
      group.scale.setScalar(wide ? 1 : 0.72);
      wireMat.opacity = wide ? 0.28 : 0.16;
    };
    layout();

    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let pulse = 1;
    let fade = 1;
    let running = false;
    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      smoothX += (pointerX - smoothX) * Math.min(1, dt * 4);
      smoothY += (pointerY - smoothY) * Math.min(1, dt * 4);
      pulse += (1 - pulse) * Math.min(1, dt * 5);

      core.rotation.y += dt * 0.18;
      core.rotation.x += dt * 0.08;
      wire.rotation.y = core.rotation.y + smoothX * 0.6;
      wire.rotation.x = core.rotation.x + smoothY * 0.6;
      core.scale.setScalar(pulse);
      wire.scale.setScalar(pulse);
      ring.rotation.z += dt * 0.12;
      group.rotation.y = smoothX * 0.25;
      group.rotation.x = smoothY * 0.18;
      dust.rotation.y += dt * 0.012;

      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onScroll = () => {
      const h = window.innerHeight;
      fade = Math.max(0, 1 - window.scrollY / (h * 0.9));
      canvas.style.opacity = fade.toFixed(3);
      if (fade <= 0.01 || document.hidden) stop();
      else start();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else onScroll();
    };

    const onResize = () => {
      layout();
      if (!running) draw(performance.now());
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    api.current = {
      setColor: (hex) => {
        wireMat.color.setHex(hex);
        ringMat.color.setHex(hex);
        keyLight.color.setHex(hex);
        if (!running) draw(performance.now());
      },
      setShape: (i) => {
        const cfg = SHAPES[i] ?? SHAPES[0];
        core.geometry.dispose();
        wire.geometry.dispose();
        core.geometry = cfg.core();
        wire.geometry = cfg.wire();
        pulse = reduced ? 1 : 1.18;
        if (!running) draw(performance.now());
      },
    };

    draw(performance.now());
    onScroll();

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      api.current = null;
      core.geometry.dispose();
      wire.geometry.dispose();
      coreMat.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
    // Scene is built once; theme and shape changes go through api.current.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api.current?.setColor(themeConfig.hex);
  }, [themeConfig]);

  const firstShape = useRef(true);
  useEffect(() => {
    if (firstShape.current) {
      firstShape.current = false;
      return;
    }
    api.current?.setShape(shapeIndex);
  }, [shapeIndex]);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
}
