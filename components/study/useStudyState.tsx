"use client"
// useStudyState.tsx
import { useState, useEffect } from "react";

export default function useStudyState() {
    const [page, setPage] = useState<string>("overview");

    return {
        page,
        setPage
    }
}