// Handles Canvas creation and custom render loop
export default function handleCanvasCreated({ gl, advance, invalidate, scene, camera }, refs, onLoaded) {
  const { fpsLimitRef, fpsLimitEnabledRef, lastFrameTimeRef } = refs;
  if (onLoaded) onLoaded();
  gl.toneMapping = 1; // THREE.ACESFilmicToneMapping
  gl.outputEncoding = 3001; // THREE.sRGBEncoding

  // Responsive custom render loop for FPS limiting
  function renderLoop(now) {
    const enabled = fpsLimitEnabledRef.current;
    const fps = enabled ? fpsLimitRef.current : 60;
    const frameInterval = 1000 / fps;
    if (now - lastFrameTimeRef.current >= frameInterval) {
      advance();
      lastFrameTimeRef.current = now;
    }
    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);
}
