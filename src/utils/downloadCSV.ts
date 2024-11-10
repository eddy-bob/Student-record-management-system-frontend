const downloadCSV = (data: any[], fileName = "file") => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob as globalThis.Blob);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const convertToCSV = (data: any[]) => {
  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data
    .map((row) =>
      Object.values(row)
        .map((value) => `${value}`)
        .join(",")
    )
    .join("\n");
  return headers + rows;
};
export default downloadCSV;
