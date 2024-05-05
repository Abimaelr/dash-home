import express from 'express';
import ReportController from './controller/report.controller.js';


const ReportRouter = express.Router();

ReportRouter.use(ReportController)

export default ReportRouter;