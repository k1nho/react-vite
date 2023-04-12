interface Iprops {
    position: { x: number, y: number }
}

export const Background: React.FC<Iprops> = ({
    position
}) => {
    return (
        <div style={{
            position: 'absolute',
            transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
            width: 250,
            height: 250,
            backgroundColor: 'rgba(200, 200, 0, 0.2)',
        }} />
    );
};
