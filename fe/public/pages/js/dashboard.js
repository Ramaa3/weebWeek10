// Menghitung ringkasan dashboard dari API backend.
$(function () {
  const data = window.NucleoData;
  Promise.all([data.request("/facilities"), data.request("/monitoring"), data.request("/reports")])
    .then(([facilities, monitoring, reports]) => {
      $("#dashboardFacilityCount").text(facilities.length);
      $("#dashboardMonitoringCount").text(monitoring.length);
      $("#dashboardReportCount").text(reports.length);
    })
    .catch(() => {
      $("#dashboardFacilityCount").text(data.facilities.length);
      $("#dashboardMonitoringCount").text(data.monitoring.length);
      $("#dashboardReportCount").text(data.reports.length);
    });
});
