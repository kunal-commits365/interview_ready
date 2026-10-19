const mongoose = require("mongoose")
const { z } = require("zod")
const { PDFParse } = require("pdf-parse")

const interviewReportModel = require("../model/interviewreport.user")
const { generateInterviewReport, generateResumePdf } = require("../service/ai.service")


const generateReportSchema = z.object({
    jobDescription: z.string().min(1, "jobDescription is required"),
    selfDescription: z.string().optional().default("")
})


async function parseResumeFile(file) {
    const parser = new PDFParse({ data: file.buffer })

    try {
        const result = await parser.getText()
        return result.text
    } finally {
        await parser.destroy()
    }
}


async function generateInterViewReportController(req, res, next) {
    try {
        const parsed = generateReportSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "invalid request body",
                errors: parsed.error.issues
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "resume file is required"
            })
        }

        const { jobDescription, selfDescription } = parsed.data

        const resume = await parseResumeFile(req.file)

        const report = await generateInterviewReport({
            resume,
            selfDescription,
            jobDescription
        })

        const savedReport = await interviewReportModel.create({
            jobDescription,
            resume,
            selfDescription,
            ...report,
            user: req.user.id
        })

        return res.status(201).json({
            message: "interview report generated successfully",
            interviewReport: savedReport
        })

    } catch (error) {
        next(error)
    }
}


async function getInterviewReportByIdController(req, res, next) {
    try {
        const { interviewId } = req.params

        if (!mongoose.isValidObjectId(interviewId)) {
            return res.status(400).json({
                message: "invalid interview id"
            })
        }

        const report = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        })

        if (!report) {
            return res.status(404).json({
                message: "interview report not found"
            })
        }

        return res.status(200).json({
            message: "interview report fetched successfully",
            interviewReport: report
        })

    } catch (error) {
        next(error)
    }
}


async function getAllInterviewReportsController(req, res, next) {
    try {
        const reports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "interview reports fetched successfully",
            interviewReports: reports
        })

    } catch (error) {
        next(error)
    }
}


async function generateResumePdfController(req, res, next) {
    try {
        const { interviewReportId } = req.params

        if (!mongoose.isValidObjectId(interviewReportId)) {
            return res.status(400).json({
                message: "invalid interview report id"
            })
        }

        const report = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        })

        if (!report) {
            return res.status(404).json({
                message: "interview report not found"
            })
        }

        const pdfBuffer = await generateResumePdf({
            resume: report.resume,
            selfDescription: report.selfDescription,
            jobDescription: report.jobDescription
        })

        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", `attachment; filename="resume_${interviewReportId}.pdf"`)

        return res.send(pdfBuffer)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}
