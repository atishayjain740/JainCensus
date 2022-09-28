export const validateForm = (form) => {
  if (
    !checkIfExist(form, 'basicFormInfo') ||
    !checkIfExist(form, 'additionalFormInfo') ||
    !checkIfExist(form, 'familyFormInfo') ||
    !checkIfExist(form, 'photoFormInfo')
  ) {
    return false;
  }
  if (
    validateBasicFormInfo(form.basicFormInfo) &&
    validateAdditionalFormInfo(form.additionalFormInfo) &&
    validateFamilyFormInfo(form.familyFormInfo) &&
    validatePhotoFormInfo(form.photoFormInfo)
  ) {
    return true;
  } else {
    return false;
  }
};

const validateBasicFormInfo = (basicFormInfo) => {
  if (
    checkIfExist(basicFormInfo, 'fullName') &&
    checkIfExist(basicFormInfo, 'gender') &&
    checkIfExist(basicFormInfo, 'dob') &&
    checkIfExist(basicFormInfo, 'phoneNumber') &&
    checkIfExist(basicFormInfo, 'emergencyNumber') &&
    checkIfExist(basicFormInfo, 'aadhar') &&
    checkIfExist(basicFormInfo, 'address') &&
    checkIfExist(basicFormInfo, 'city') &&
    checkIfExist(basicFormInfo, 'postalCode') &&
    checkIfExist(basicFormInfo, 'country') &&
    checkIfExist(basicFormInfo, 'educationQualification') &&
    checkIfExist(basicFormInfo, 'occupation') &&
    checkIfExist(basicFormInfo, 'married')
  ) {
    return true;
  } else {
    return false;
  }
};

const validateAdditionalFormInfo = (additionalFormInfo) => {
  if (
    checkIfExist(additionalFormInfo, 'aamnaya') &&
    checkIfExist(additionalFormInfo, 'panth') &&
    checkIfExist(additionalFormInfo, 'varn') &&
    checkIfExist(additionalFormInfo, 'jati') &&
    checkIfExist(additionalFormInfo, 'nearestJainTemple') &&
    checkIfExist(additionalFormInfo, 'templeHeadName')
  ) {
    return true;
  } else {
    return false;
  }
};

const validateFamilyFormInfo = (familyFormInfo) => {
  if (
    checkIfExist(familyFormInfo, 'numMembers') &&
    checkIfExist(familyFormInfo, 'fatherName') &&
    checkIfExist(familyFormInfo, 'familyHeadName') &&
    checkIfExist(familyFormInfo, 'headNumber') &&
    checkIfExist(familyFormInfo, 'house') &&
    checkIfExist(familyFormInfo, 'numVehicles') &&
    checkIfExist(familyFormInfo, 'economicClass')
  ) {
    return true;
  } else {
    return false;
  }
};

const validatePhotoFormInfo = (photoFormInfo) => {
  if (photoFormInfo != '') {
    return true;
  } else {
    return false;
  }
};

const checkIfExist = (info, key) => {
  if (key in info && info[key] != '') {
    return true;
  } else {
    return false;
  }
};
