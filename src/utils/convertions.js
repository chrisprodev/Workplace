export const getTypeFile = (fileName) => {
  const extension = fileName.split(".").pop();
  if (extension.includes("doc")) {
    return "doc";
  }
  if (extension.includes("wav")) {
    return "audio";
  }
  if (extension.includes("mp3")) {
    return "audio";
  }
  if (extension.includes("acc")) {
    return "audio";
  }
  return "file";
};

export const formatBytes = (size, b = 2) => {
  if (0 === size) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(size) / Math.log(1024));
  return (
    parseFloat((size / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
};
