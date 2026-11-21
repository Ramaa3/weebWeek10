// Riwayat dan formulir laporan terhubung ke backend.
$(function () {
  const data = window.NucleoData;
  const $tbody = $("#reportHistoryBody");
  const $form = $("#reportForm");
  const $message = $("#formMessage");
  const $toggle = $("#toggleReportForm");

  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
  }
  function renderReports(reports) {
    data.reports = reports;
    $tbody.empty();
    reports.forEach(function (report) {
      const $row = $("<tr>").addClass("border-b border-slate-200");
      [report.id, report.category, formatDate(report.date)].forEach(function (value) {
        $("<td>").addClass("p-4").text(value).appendTo($row);
      });
      const reviewed = report.status === "Ditinjau";
      const $badge = $("<span>").addClass("rounded-full px-3 py-1 text-sm")
        .addClass(reviewed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800")
        .text(report.status);
      $("<td>").addClass("p-4").append($badge).appendTo($row);
      $tbody.append($row);
    });
    $("#reportTotalCount").text(reports.length);
    $("#reportReviewedCount").text(reports.filter((r) => r.status === "Ditinjau").length);
    $("#reportPendingCount").text(reports.filter((r) => r.status !== "Ditinjau").length);
  }
  function showMessage(message, isError) {
    $message.removeClass("hidden bg-green-50 text-green-800 bg-red-50 text-red-800")
      .addClass(isError ? "bg-red-50 p-4 text-red-800" : "bg-green-50 p-4 text-green-800")
      .text(message);
  }

  $toggle.on("click", function () {
    $form.stop(true, true).slideToggle(200);
    const expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!expanded)).text(expanded ? "Tampilkan Form" : "Sembunyikan Form");
  });

  $form.on("submit", async function (event) {
    event.preventDefault();
    const report = {
      id: $("#reportId").val().trim(),
      category: $("#category").val(),
      date: $("#reportDate").val(),
      status: $("#reportStatus").val(),
      description: $("#description").val().trim()
    };
    if (Object.values(report).some((value) => !value)) {
      showMessage("Semua kolom wajib diisi.", true);
      return;
    }
    try {
      await data.request("/reports", { method: "POST", body: JSON.stringify(report) });
      renderReports(await data.request("/reports"));
      this.reset();
      showMessage("Laporan berhasil disimpan.", false);
      $form.stop(true, true).slideUp(200);
      $toggle.attr("aria-expanded", "false").text("Tampilkan Form");
    } catch (error) {
      showMessage(error.message || "Laporan gagal disimpan. Pastikan backend berjalan.", true);
    }
  });

  data.request("/reports").then(renderReports).catch(() => renderReports(data.reports));
});
