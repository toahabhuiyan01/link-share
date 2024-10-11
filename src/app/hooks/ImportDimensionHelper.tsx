'use client'

import { useEffect } from "react";
import useDimensionStore from "../store/DimensionStore";

function Helper() {
    const { subscribe } = useDimensionStore();
    useEffect(subscribe, [subscribe])

   return null
}

export default Helper