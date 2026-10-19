import { useCallback, useEffect, useState } from "react"
import { getAllReports } from "../service/interview.api"


export function useInterviews() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const load = useCallback(async () => {
        try {
            const data = await getAllReports()
            setReports(data.interviewReports || [])
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load reports")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load()
    }, [load])

    const refetch = useCallback(async () => {
        setLoading(true)
        await load()
    }, [load])

    return { reports, loading, error, refetch }
}
