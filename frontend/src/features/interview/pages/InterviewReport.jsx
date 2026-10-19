import { useState } from "react"
import { Link, useParams } from "react-router"
import { useInterviewReport } from "../hooks/useinterviewreport"
import { downloadResumePdf } from "../service/interview.api"
import QuestionCard from "../components/QuestionCard"


const InterviewReport = () => {
    const { interviewId } = useParams()
    const { report, loading, error } = useInterviewReport(interviewId)

    const [downloading, setDownloading] = useState(false)
    const [downloadError, setDownloadError] = useState(null)

    const handleDownload = async () => {
        setDownloading(true)
        setDownloadError(null)

        try {
            const blob = await downloadResumePdf(interviewId)
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")

            link.href = url
            link.download = `resume_${interviewId}.pdf`
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)
        } catch (err) {
            setDownloadError(err.response?.data?.message || err.message || "Failed to download resume")
        } finally {
            setDownloading(false)
        }
    }

    if (loading) {
        return (
            <div className="page-loader">
                <span className="spinner" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="empty-state">
                <h2>{error}</h2>
                <Link to="/home" className="button primary-button">Back to dashboard</Link>
            </div>
        )
    }

    if (!report) {
        return null
    }

    return (
        <section className="report-page">
            <div className="page-head">
                <div>
                    <h1>{report.title}</h1>
                    <p className="report-card-meta">
                        Generated {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <button className="button primary-button" onClick={handleDownload} disabled={downloading}>
                    {downloading ? "Preparing..." : "Download Tailored Resume"}
                </button>
            </div>

            {downloadError && <p className="error-message">{downloadError}</p>}

            <div className="score-card">
                <span className="score-label">Match Score</span>
                <div className="score-bar">
                    <span style={{ width: `${report.matchScore}%` }} />
                </div>
                <span className="score-value">{report.matchScore}%</span>
            </div>

            <section className="report-section">
                <h2>Technical Questions</h2>
                {report.technicalQuestions?.length
                    ? report.technicalQuestions.map((q, i) => <QuestionCard key={i} index={i} question={q} />)
                    : <p className="subtitle">No technical questions available.</p>}
            </section>

            <section className="report-section">
                <h2>Behavioral Questions</h2>
                {report.behavioralQuestions?.length
                    ? report.behavioralQuestions.map((q, i) => <QuestionCard key={i} index={i} question={q} />)
                    : <p className="subtitle">No behavioral questions available.</p>}
            </section>

            <section className="report-section">
                <h2>Skill Gaps</h2>
                <div className="skill-gaps">
                    {report.skillGaps?.map((gap, i) => (
                        <span key={i} className={`skill-badge severity-${gap.severity}`}>
                            {gap.skill}
                            <em>{gap.severity}</em>
                        </span>
                    ))}
                </div>
            </section>

            <section className="report-section">
                <h2>Preparation Plan</h2>
                <div className="prep-plan">
                    {report.preparationPlan?.map((day) => (
                        <div key={day.day} className="prep-day">
                            <div className="prep-day-badge">Day {day.day}</div>
                            <div className="prep-day-content">
                                <h3>{day.focus}</h3>
                                <ul>
                                    {day.tasks?.map((task, j) => <li key={j}>{task}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}


export default InterviewReport
