import { useCallback, useEffect, useState } from "react"
import { getReportById } from "../service/interview.api"


export function useInterviewReport(interviewId) {
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const load = useCallback(async () => {
        if (!interviewId) {
            return
        }

        try {
            const data = await getReportById(interviewId)
            setReport(data.interviewReport)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load report")
        } finally {
            setLoading(false)
        }
    }, [interviewId])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load()
    }, [load])

    const refetch = useCallback(async () => {
        setLoading(true)
        await load()
    }, [load])

    return { report, loading, error, refetch }
}
