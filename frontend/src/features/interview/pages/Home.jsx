import { Link } from "react-router"
import { useInterviews } from "../hooks/useinterviews"


const Home = () => {
    const { reports, loading, error } = useInterviews()

    return (
        <section className="dashboard">
            <div className="page-head">
                <div>
                    <h1>Your Interview Reports</h1>
                    <p className="subtitle">Generate, review and prepare with AI-powered interview reports.</p>
                </div>

                <Link to="/interview/new" className="button primary-button">+ New Interview</Link>
            </div>

            {loading && (
                <div className="page-loader">
                    <span className="spinner" />
                </div>
            )}

            {!loading && error && (
                <p className="error-message">{error}</p>
            )}

            {!loading && !error && reports.length === 0 && (
                <div className="empty-state">
                    <h2>No interview reports yet</h2>
                    <p>Create your first report to get tailored questions, skill gaps and a preparation plan.</p>
                    <Link to="/interview/new" className="button primary-button">Create one</Link>
                </div>
            )}

            {!loading && !error && reports.length > 0 && (
                <div className="report-grid">
                    {reports.map((report) => (
                        <Link key={report._id} to={`/interview/${report._id}`} className="report-card">
                            <div className="report-card-top">
                                <h3>{report.title}</h3>
                                <span className="score-pill">{report.matchScore}%</span>
                            </div>

                            <p className="report-card-meta">
                                {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}


export default Home
