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
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}
        >
            <LoaderCircle
                id="loader"
                size={100}
            />
        </div>
    )
}