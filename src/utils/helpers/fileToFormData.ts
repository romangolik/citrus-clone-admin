export function fileToFormData(file: File, fieldName: string): FormData {
  const formData = new FormData();
  formData.append(fieldName, file);
  formData.append('Content-Type', file.type);
  return formData;
}