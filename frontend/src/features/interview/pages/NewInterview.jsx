import { useState } from "react"
import { useCreateReport } from "../hooks/usecreatereport"


const MAX_FILE_SIZE = 3 * 1024 * 1024


const NewInterview = () => {
    const { submitReport, loading, error } = useCreateReport()

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resume, setResume] = useState(null)
    const [formError, setFormError] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null
        setFormError(null)

        if (!file) {
            setResume(null)
            return
        }

        if (file.type !== "application/pdf") {
            setFormError("Please upload a PDF file")
            setResume(null)
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            setFormError("File size must be under 3MB")
            setResume(null)
            return
        }

        setResume(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!jobDescription.trim()) {
            setFormError("Job description is required")
            return
        }

        if (!resume) {
            setFormError("Resume PDF is required")
            return
        }

        const formData = new FormData()
        formData.append("resume", resume)
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)

        await submitReport(formData)
    }

    return (
        <section className="form-page">
            <h1>New Interview Report</h1>
            <p className="subtitle">Upload your resume and paste the job description to get started.</p>

            <form className="interview-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        id="jobDescription"
                        rows="6"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description..."
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="selfDescription">Self Description (optional)</label>
                    <textarea
                        id="selfDescription"
                        rows="4"
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        placeholder="Tell us about yourself, your goals and experience..."
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="resume">Resume (PDF, max 3MB)</label>
                    <input
                        id="resume"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>

                {(formError || error) && <p className="error-message">{formError || error}</p>}

                <button className="button primary-button" type="submit" disabled={loading}>
                    {loading ? "Generating..." : "Generate Report"}
                </button>
            </form>
        </section>
    )
}


export default NewInterview
