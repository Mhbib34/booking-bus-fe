export class AuthValidation {
  static validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  static validatePhone = (phone: string) => {
    const phoneRegex = /^08[0-9]{8,11}$/;
    return phoneRegex.test(phone);
  };
}
