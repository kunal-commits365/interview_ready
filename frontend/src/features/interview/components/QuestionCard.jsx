import { useState } from "react"


const QuestionCard = ({ index, question }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`question-card ${open ? "open" : ""}`}>
            <button type="button" className="question-header" onClick={() => setOpen(!open)}>
                <span className="question-index">Q{index + 1}</span>
                <span className="question-text">{question.question}</span>
                <span className="question-toggle">{open ? "−" : "+"}</span>
            </button>

            {open && (
                <div className="question-body">
                    <div className="question-block">
                        <h4>Intention</h4>
                        <p>{question.intention}</p>
                    </div>

                    <div className="question-block">
                        <h4>How to answer</h4>
                        <p>{question.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}


export default QuestionCard
