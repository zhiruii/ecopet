import type { PetMood } from 'shared/types';

const INK = 'var(--ink)';

export const Eyes = ({ mood }: { mood: PetMood }) => {
  if (mood === 'sleepy') {
    return (
      <g fill={INK} shapeRendering="crispEdges">
        <rect x="33" y="42" width="10" height="4" />
        <rect x="57" y="42" width="10" height="4" />
      </g>
    );
  }
  if (mood === 'happy') {
    return (
      <g fill={INK} shapeRendering="crispEdges">
        <rect x="33" y="43" width="5" height="5" />
        <rect x="38" y="38" width="5" height="5" />
        <rect x="43" y="43" width="5" height="5" />
        <rect x="57" y="43" width="5" height="5" />
        <rect x="62" y="38" width="5" height="5" />
        <rect x="67" y="43" width="5" height="5" />
      </g>
    );
  }
  if (mood === 'sad') {
    return (
      <g shapeRendering="crispEdges">
        <rect x="33" y="38" width="10" height="10" fill={INK} />
        <rect x="57" y="38" width="10" height="10" fill={INK} />
        <rect x="36" y="50" width="5" height="5" fill="#5EC7EE" />
        <rect x="61" y="50" width="5" height="5" fill="#5EC7EE" />
      </g>
    );
  }
  return (
    <g shapeRendering="crispEdges">
      <rect x="33" y="38" width="10" height="10" fill={INK} />
      <rect x="57" y="38" width="10" height="10" fill={INK} />
      <rect x="35" y="40" width="5" height="5" fill="white" />
      <rect x="60" y="40" width="5" height="5" fill="white" />
    </g>
  );
};
