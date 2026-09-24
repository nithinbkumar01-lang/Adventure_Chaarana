// tsx falls back to os.userInfo() on Windows when process.geteuid is missing.
// Some restricted Windows shells fail that OS lookup; USERNAME is already
// provided by Windows and is sufficient for tsx's temporary directory name.
if (process.platform === 'win32' && typeof process.geteuid !== 'function') {
  process.geteuid = () => process.env.USERNAME || 'local';
}

// tsx launches a child Node process for the TypeScript entry point. Pass this
// preload to that child as well so its tsx modules use the same workaround.
if (process.platform === 'win32') {
  const preload = '--require=./scripts/tsx-userinfo-shim.cjs';
  if (!process.env.NODE_OPTIONS?.includes(preload)) {
    process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, preload].filter(Boolean).join(' ');
  }
}
