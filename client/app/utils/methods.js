export const isValidObjField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 2500);
};

export const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

export const getData = async () => {
  //gets user data from async storage
  console.log("inside getData");
  try {
    const data = await AsyncStorage.getItem("data");
    console.log("fetched data", typeof data);
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.dir("fetch data error-", e);
  }
};
