import type { PetMood } from 'shared/types';

const INK = 'var(--ink)';

export const Mouth = ({ mood }: { mood: PetMood }) => {
  if (mood === 'eating') {
    return <rect x="45" y="53" width="5" height="5" fill={INK} shapeRendering="crispEdges" />;
  }
  if (mood === 'sad') {
    return (
      <g fill={INK} shapeRendering="crispEdges">
        <rect x="42" y="58" width="5" height="5" />
        <rect x="47" y="55" width="5" height="5" />
        <rect x="52" y="58" width="5" height="5" />
      </g>
    );
  }
  if (mood === 'sleepy') {
    return <rect x="46" y="55" width="4" height="4" fill={INK} shapeRendering="crispEdges" />;
  }
  return (
    <g fill={INK} shapeRendering="crispEdges">
      <rect x="42" y="55" width="5" height="5" />
      <rect x="47" y="58" width="5" height="5" />
      <rect x="52" y="55" width="5" height="5" />
    </g>
  );
};
