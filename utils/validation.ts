// Form validation utilities
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'E-posta adresi gereklidir' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Geçerli bir e-posta adresi giriniz' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Şifre gereklidir' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Şifre en az 6 karakter olmalıdır' };
  }
  
  if (password.length > 50) {
    return { isValid: false, message: 'Şifre en fazla 50 karakter olabilir' };
  }
  
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, message: 'Ad soyad gereklidir' };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: 'Ad soyad en az 2 karakter olmalıdır' };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: 'Ad soyad en fazla 50 karakter olabilir' };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: 'Telefon numarası gereklidir' };
  }
  
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Geçerli bir telefon numarası giriniz' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} gereklidir` };
  }
  
  return { isValid: true };
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  if (value.length < minLength) {
    return { isValid: false, message: `${fieldName} en az ${minLength} karakter olmalıdır` };
  }
  
  return { isValid: true };
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  if (value.length > maxLength) {
    return { isValid: false, message: `${fieldName} en fazla ${maxLength} karakter olabilir` };
  }
  
  return { isValid: true };
};
