import html2canvas from "html2canvas";

export const exportAsImage = async (
  element: HTMLElement,
): Promise<string> => {
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL("image/png", 1.0);
  return image;
};

const downloadImage = (
  blob: string,
  fileName: string,
) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};
