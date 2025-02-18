type Vector2 = [x: number, y: number];

export function vector2ScaleContained(target: Vector2, source: Vector2): Vector2 {
  const [aX, aY] = target;
  const [bX, bY] = source;

  const diffX = Math.abs(aX - bX);
  const diffY = Math.abs(aY - bY);

  if (diffX > diffY) {
    const scale = aX / bX;
    return [bX * scale, bY * scale]
  } else {
    const scale = aY / diffX;
    return aY > bY ? [bX * scale, bY * scale] : [aX * scale, aY * scale];
  }
}