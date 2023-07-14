const goodDate = () => {
  let d = new Date();
  return ` ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const margeArr = (arr) => {
  const newArr = [];

  arr.forEach((value, index) => {
    for (let i = 1; i < arr.length; i++) {
      const element = arr[i];
      if (element === null || value === null) continue;
      if (
        element.first_name === value.first_name &&
        element.last_name === value.last_name &&
        i !== index
      ) {
        const toMarge = {
          first_name: value.first_name,
          last_name: value.last_name,
          TimesMorning: value.TimesMorning + element.TimesMorning,
          TimesAfternoon: value.TimesAfternoon + element.TimesAfternoon,
        };
        for (let x = 0; x < arr.length; x++) {
          const match = arr[x];
          if (match === null) continue;
          if (
            match.first_name === value.first_name &&
            match.last_name === value.last_name
          ) {
            arr[x] = null;
          }
        }
        newArr.push(toMarge);
        break;
      }
    }
  });
  arr.forEach((value) => {
    if (value !== null) {
      newArr.push(value);
    }
  });
  return newArr;
};
module.exports = {
  goodDate,
  margeArr,
};
