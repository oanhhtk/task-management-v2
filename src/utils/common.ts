import moment from "moment";

export const formatDate = (date: any, formater = "DD-MM-YYYY HH:mm:ss") => {
  return moment(date).format(formater);
};
