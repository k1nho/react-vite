import { useState } from "react";

interface Iprops {
    children: string | JSX.Element;
    color: string;
    position: { x: number; y: number };
    onMove: (dx: number, dy: number) => void;
}

export const Box: React.FC<Iprops> = ({
    children,
    color,
    position,
    onMove,
}) => {
    const [lastCoordinates, setLastCoordinates] = useState<
        typeof position | null
    >(null);

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        e.currentTarget.setPointerCapture(e.pointerId);
        setLastCoordinates({
            x: e.clientX,
            y: e.clientY,
        });
    }

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (lastCoordinates) {
            setLastCoordinates({
                x: e.clientX,
                y: e.clientY,
            });
            const dx = e.clientX - lastCoordinates.x;
            const dy = e.clientY - lastCoordinates.y;
            onMove(dx, dy);
        }
    }

    function handlePointerUp() {
        setLastCoordinates(null);
    }

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
                width: 100,
                height: 100,
                cursor: "grab",
                backgroundColor: color,
                position: "absolute",
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
            }}
        >
            {children}
        </div>
    );
};
