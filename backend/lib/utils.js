// Core utilities
export const logHealth = () => {
  console.log("System healthy at:", new Date());
};

export const sanitizeInput = (str) => {
  return str.trim().replace(/\s+/g, "-");
};
