class ReportService {
    constructor() {}

    show(reportName) {
        let data = {
            reportName: reportName
        }
        let evt = new CustomEvent('report:show', { detail: data });
    }
    search(reportName, criteria) {
        let data = {
            reportName: reportName,
            criteria: criteria
        }
        let evt = new CustomEvent('report:search', { detail: data });
        document.dispatchEvent(evt)
    }
}

window.report = window.report || new ReportService();