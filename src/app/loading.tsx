import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.2)',
            }}
        >
            <Loader size={100} />
        </div>
    )
}

export function Loader({ size }: { size?: number }) {
    return (
        <LoaderCircle
            id="loader"
            size={size || 20}
        />
    )
}