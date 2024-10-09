import { Button } from "@/components/ui/button";
import useLinkStore from "@/app/store/LinkStore";
import { IView } from "@/app/types";

export default function TopBar() {
    const { selectedView, setSelectedView } = useLinkStore()
    return (
        <div
            className="flex flex-row justify-between items-center p-4 bg-white rounded-lg"
        >
            <h3>devlinks</h3>
            <div className="flex flex-row gap-4">
                {
                    ['Links', 'Profile Details'].map((item) => (
                        <Button
                            key={item}
                            className="w-40"
                            onClick={() => setSelectedView(item as IView)}
                            variant={ selectedView === item ? 'secondary' : 'ghost'}
                        >
                            {item}
                        </Button>
                    ))
                }
            </div>
            <Button
                className="w-32"
                variant='outline'
            >
                Preview
            </Button>
        </div>
    )
}