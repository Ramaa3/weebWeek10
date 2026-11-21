// Menampilkan dan memfilter data simulasi udara, air, dan tanah melalui API.
$(function () {
  const $tbody = $("#monitoringTableBody");
  function render(rows) {
    $tbody.empty();
    if (!rows.length) {
      $("<tr>").append($("<td>").attr("colspan", 6).addClass("px-5 py-4 text-center").text("Data tidak ditemukan.")).appendTo($tbody);
      return;
    }
    rows.forEach(function (item, index) {
      const $row = $("<tr>").addClass("transition hover:bg-slate-50");
      [index + 1, item.id, item.type, item.parameter, item.value, item.activity].forEach(function (value) {
        $("<td>").addClass("px-5 py-4").text(value).appendTo($row);
      });
      $tbody.append($row);
    });
  }
  function load(type) {
    const query = type === "Semua" ? "" : `?type=${encodeURIComponent(type)}`;
    window.NucleoData.request(`/monitoring${query}`).then(render)
      .catch(() => render(window.NucleoData.monitoring.filter((item) => type === "Semua" || item.type === type)));
  }
  $("#monitoringFilter").on("change", function () { load($(this).val()); });
  load("Semua");
});
