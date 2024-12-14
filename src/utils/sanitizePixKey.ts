export const sanitizePixKey = (key: string) => {
  return key.replace(/\D/g, ""); 
};