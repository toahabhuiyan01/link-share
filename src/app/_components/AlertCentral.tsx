'use client'

import useAlertStore from "../_store/AlertStore"
import { Terminal, X } from "lucide-react"
import { useEffect } from "react"
function AlertCentral() {
    const { alert, clearAlert } = useAlertStore()

    useEffect(
        () => {
            if (alert) {
                setTimeout(clearAlert, (alert.timeout || 3000))
            }
        },
        [alert]
    )
    
    if (!alert) return null

    const alertType = alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'

    return (
        <div
            className={`absolute w-96 p-4 rounded-xl justify-between flex items-center bottom-8 right-4 ${alertType}`}
            style={{ maxWidth: 'calc(100% - 2rem)' }}
        >
            <div className="flex flex-row items-center gap-4">
                <Terminal className={`h-4 w-4 ${alertType}`} />
                <div className="flex flex-col">
                    {
                        alert.title && (
                            <p className="font-semibold text-base">
                                {alert.title}
                            </p>
                        )
                    }
                    <p className="font-normal text-sm text-center">
                        {alert?.message}
                    </p>
                </div>
            </div>
            <X
                className="h-4 w-4 cursor-pointer"
                onClick={clearAlert}
            />
        </div>
    )
}

export default AlertCentral