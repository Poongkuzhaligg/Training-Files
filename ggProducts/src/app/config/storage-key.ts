
export const STORAGE_KEY = {
  currentUser: 'currentUsers',
  userProducts: 'product',
  userFavProducts: 'favProduct',
  userToken: 'token'
};

export enum ProductCategory {
  kitchen = 'Kitchen and home',
  fitness = 'Fitness',
  health = 'health and wellness',
  kitchenCaps = 'KITCHEN & HOME',
  fitnessCaps = 'FITNESS',
  healthCaps = 'HEALTH & WELLNESS'
}

export enum FormLabelName {
  firstname = 'First Name',
  lastname = 'Last Name',
  email = 'Email ID',
  password = 'Password',
  oldPassword = 'Old Password',
  newPassword = 'New Password',
  confirmPassword = 'Confirm Password'
}

export enum EmailPattern {
  pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
}

export const VALIDATION_TEXT = {
  firstnameRequired: 'First Name is required',
  lastnameRequired: 'Last Name is required',
  emailRequired: 'Email is required',
  emailPattern: 'Enter a valid Email ID',
  passwordRequired: 'Password is required',
  passwordLength: 'Password must have 6 characters',
  passwordMatch: 'Passwords do not match'
};

export enum NotFoundText {
  notFound = 'Uh oh! ',
  noProducts = 'Product not Found!',
  noFavorites = 'No favourite products to show!!'
}

export enum ProductSKU {
  sku = 'SKU: '
};

export enum SaveBtn {
  save = 'SAVE'
};

export const CONTACT_DETAILS = {
  helpQuestion: 'Have a question? We’re here for you.',
  contactUs: 'Contact us and we\'ll be happy to help.',
  manual: 'User Manual: ',
  phone: 'Phone: ',
  email: 'Email: ',
  contactNo: '866.991.8494',
  contactMail: 'info@greatgoods.com'
};

export const TOAST_MESSAGE = {
  504: 'An error has occured, Please Try again',
  invalidUser: 'Sorry Invalid details, Try Registering',
  offline: 'You\'re offline! Check your Internet connection.',
  emailExist: 'Email already exists! Try again',
  registerSuccess: 'Registration Successful!',
  profileUpdated: 'Profile updated successfully!',
  passwordUpdated: 'Password changed successfully!',
  tryAgain: 'Sorry, Try again!',
  successColor: 'success',
  dangerColor: 'danger',
  lightColor: 'light',
  mediumColor: 'medium',
  darkColor: 'dark',
  top: 'top',
  bottom: 'bottom',
  middle: 'middle',
  secondary: 'secondary'
};

export const ALERT_MESSAGE = {
  header: 'ALERT',
  messageTry: 'Try Again!',
  messageWarn: 'There are changes you have made to the page. If you quit, you will lose your changes.',
  buttonOk: 'OK',
  buttonCancel: 'CANCEL',
  roleCancel: 'cancel',
  roleConfirm: 'confirm',
  subHeader: 'Data Invalid!'
};
