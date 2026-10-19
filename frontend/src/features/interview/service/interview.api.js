import api from "../../../lib/api"


export async function createReport(formData) {

    const response = await api.post("/api/interview", formData)

    return response.data

}


export async function getAllReports() {

    const response = await api.get("/api/interview")

    return response.data

}


export async function getReportById(interviewId) {

    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data

}


export async function downloadResumePdf(interviewReportId) {

    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data

}
