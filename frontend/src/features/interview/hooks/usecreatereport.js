import { useState } from "react"
import { useNavigate } from "react-router"
import { createReport } from "../service/interview.api"


export function useCreateReport() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const submitReport = async (formData) => {
        setLoading(true)
        setError(null)

        try {
            const data = await createReport(formData)
            navigate(`/interview/${data.interviewReport._id}`)
            return true
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to generate report")
            return false
        } finally {
            setLoading(false)
        }
    }

    return { submitReport, loading, error }
}
