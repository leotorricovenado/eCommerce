/**
 * QR decorativo (placeholder) — patrón determinístico, no escaneable.
 * Reemplazar por el QR real que devuelva el proveedor de pago.
 */
export function QRPlaceholder({ size = 180 }: { size?: number }) {
  const n = 21;
  const cell = size / n;
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, n - 7) || inBox(n - 7, 0);
  };
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (isFinder(r, c)) continue;
      // patrón pseudo-aleatorio estable
      const on = (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0;
      if (on)
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            rx={cell * 0.15}
            fill="#14181f"
          />,
        );
    }
  }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect
        x={x * cell}
        y={y * cell}
        width={cell * 7}
        height={cell * 7}
        rx={cell}
        fill="none"
        stroke="#14181f"
        strokeWidth={cell}
      />
      <rect
        x={(x + 2) * cell}
        y={(y + 2) * cell}
        width={cell * 3}
        height={cell * 3}
        rx={cell * 0.6}
        fill="#14181f"
      />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff" />
      {cells}
      <Finder x={0} y={0} />
      <Finder x={n - 7} y={0} />
      <Finder x={0} y={n - 7} />
    </svg>
  );
}
