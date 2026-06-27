"use client";

import { useRef, useEffect } from "react";

interface GalaxyBackgroundProps {
  className?: string;
}

/**
 * Full-screen Three.js WebGPU galaxy background.
 *
 * Combines:
 * - Galaxy spiral particle system (from webgpu_tsl_galaxy example)
 * - Scene, lighting, and post-processing (from webgpu_tsl_vfx_linkedparticles)
 * - Mouse-following interaction (galaxy drifts toward cursor)
 *
 * Must be loaded via `next/dynamic` with `ssr: false` — this module
 * references browser-only APIs (WebGPU, canvas, pointer events).
 */
export function GalaxyBackground({ className }: GalaxyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;
    let pointerHandler: ((e: PointerEvent) => void) | null = null;
    let resizeHandler: (() => void) | null = null;

    (async () => {
      try {
        /* ───────────────────────────────────────────
         * Dynamic imports — resolved only on the client
         * ─────────────────────────────────────────── */
        const THREE = await import("three/webgpu");
        const {
          color,
          cos,
          float,
          mix,
          range,
          sin,
          time,
          uniform,
          uv,
          vec3,
          vec4,
          TWO_PI,
          pass,
        } = await import("three/tsl");
        const { OrbitControls } = await import(
          // @ts-expect-error — three.js addon types are incomplete
          "three/addons/controls/OrbitControls.js"
        );
        const { bloom } = await import(
          // @ts-expect-error — three.js addon types are incomplete
          "three/addons/tsl/display/BloomNode.js"
        );

        if (disposed) return;

        /* ───────────────────────────────────────────
         * WebGPU availability check
         * ─────────────────────────────────────────── */
        if (!navigator.gpu) {
          console.warn(
            "[GalaxyBackground] WebGPU not supported — rendering disabled"
          );
          return;
        }

        /* ───────────────────────────────────────────
         * Performance detection — reduce particles on mobile
         * ─────────────────────────────────────────── */
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
            navigator.userAgent
          ) || window.innerWidth < 768;
        const particleCount = isMobile ? 5000 : 20000;

        /* ───────────────────────────────────────────
         * Camera — FOV 50 matches original galaxy example,
         * position gives a nice 3/4 overhead angle of the spiral
         * ─────────────────────────────────────────── */
        const camera = new THREE.PerspectiveCamera(
          50,
          container.clientWidth / container.clientHeight,
          0.1,
          200
        );
        camera.position.set(3, 3, 4);

        /* ───────────────────────────────────────────
         * Scene
         * ─────────────────────────────────────────── */
        const scene = new THREE.Scene();

        /* ───────────────────────────────────────────
         * Renderer (linked-particles setup)
         * ─────────────────────────────────────────── */
        renderer = new THREE.WebGPURenderer({ antialias: true });
        renderer.setClearColor(0x14171a);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(renderer.domElement);

        // Ensure canvas fills container
        (renderer.domElement as HTMLCanvasElement).style.display = "block";

        await renderer.init();
        if (disposed) {
          renderer.dispose();
          return;
        }

        /* ───────────────────────────────────────────
         * Galaxy Particles (galaxy example, GSSoC brand colors)
         * ─────────────────────────────────────────── */
        const material = new THREE.SpriteNodeMaterial({
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const size = uniform(0.04);
        material.scaleNode = range(0, 1).mul(size);

        const radiusRatio = range(0, 1);
        const radius = radiusRatio.pow(1.5).mul(5).toVar();

        const branches = 3;
        const branchAngle = range(0, branches)
          .floor()
          .mul(TWO_PI.div(branches));
        const angle = branchAngle.add(time.mul(1.5).mul(radiusRatio.oneMinus()));

        const position = vec3(cos(angle), 0, sin(angle)).mul(radius);
        const randomOffset = range(vec3(-1), vec3(1))
          .pow3()
          .mul(radiusRatio)
          .add(0.2);

        material.positionNode = position.add(randomOffset);

        // Neon blue center → neon green outer arms
        const colorInside = uniform(color("#00f3ff")); // neon blue (glowing center)
        const colorOutside = uniform(color("#00ff44")); // neon green (spiral arms)
        const colorFinal = mix(
          colorInside,
          colorOutside,
          radiusRatio.pow(2.0)
        );
        const alpha = float(0.1).div(uv().sub(0.5).length()).sub(0.2);
        material.colorNode = vec4(colorFinal, alpha);

        const galaxyMesh = new THREE.InstancedMesh(
          new THREE.PlaneGeometry(1, 1),
          material,
          particleCount
        );
        scene.add(galaxyMesh);

        /* ───────────────────────────────────────────
         * Post-Processing — Bloom (linked-particles)
         * ─────────────────────────────────────────── */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let pipeline: any = null;
        try {
          // v0.185 exposes both RenderPipeline and PostProcessing
          const PipelineClass =
            (THREE as Record<string, unknown>).RenderPipeline ||
            (THREE as Record<string, unknown>).PostProcessing;
          if (PipelineClass) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pipeline = new (PipelineClass as any)(renderer);
            const scenePass = pass(scene, camera);
            const scenePassColor = scenePass.getTextureNode("output");
            const bloomPass = bloom(scenePassColor, 2.5, 0.1, 0.1);
            pipeline.outputNode = scenePassColor.add(bloomPass);
          }
        } catch {
          console.warn(
            "[GalaxyBackground] Bloom unavailable — rendering without post-processing"
          );
        }

        /* ───────────────────────────────────────────
         * Controls — auto-rotate only, no manual interaction
         * ─────────────────────────────────────────── */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.maxDistance = 75;
        // Disable manual interaction — this is a background
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false;

        /* ───────────────────────────────────────────
         * Mouse Tracking — galaxy drifts toward cursor
         * ─────────────────────────────────────────── */
        const screenPointer = new THREE.Vector2();
        const scenePointer = new THREE.Vector3();
        // Galaxy lives in the XZ plane (Y = 0)
        const raycastPlane = new THREE.Plane(
          new THREE.Vector3(0, 1, 0),
          0
        );
        const raycaster = new THREE.Raycaster();
        const galaxyTarget = new THREE.Vector3();

        pointerHandler = (e: PointerEvent) => {
          screenPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
          screenPointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("pointermove", pointerHandler);

        /* ───────────────────────────────────────────
         * Clock
         * ─────────────────────────────────────────── */
        const clock = new THREE.Clock();

        /* ───────────────────────────────────────────
         * Render Loop
         * ─────────────────────────────────────────── */
        renderer.setAnimationLoop(() => {
          if (disposed) return;

          const elapsed = clock.getElapsedTime();

          // Raycast to XZ plane for mouse position
          raycaster.setFromCamera(screenPointer, camera);
          const hit = raycaster.ray.intersectPlane(
            raycastPlane,
            scenePointer
          );
          if (hit) {
            // Galaxy center follows mouse across the entire screen
            galaxyTarget.lerp(scenePointer, 0.06);
            galaxyMesh.position.x = galaxyTarget.x;
            galaxyMesh.position.z = galaxyTarget.z;
          }



          controls.update();

          if (pipeline) {
            pipeline.render();
          } else {
            renderer.render(scene, camera);
          }
        });

        /* ───────────────────────────────────────────
         * Resize Handler
         * ─────────────────────────────────────────── */
        resizeHandler = () => {
          if (!container || disposed) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", resizeHandler);
      } catch (err) {
        console.error("[GalaxyBackground] Initialization failed:", err);
      }
    })();

    /* ─── Cleanup ──────────────────────────────── */
    return () => {
      disposed = true;
      if (pointerHandler)
        window.removeEventListener("pointermove", pointerHandler);
      if (resizeHandler)
        window.removeEventListener("resize", resizeHandler);
      if (renderer) {
        renderer.setAnimationLoop(null);
        renderer.dispose();
        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ pointerEvents: "none", overflow: "hidden" }}
    />
  );
}
