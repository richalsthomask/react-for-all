export const uniqueId = (data: { id: number }[]): number => {
  let id = Math.random() * 100000;
  if (data?.find((ele) => ele.id === id)) {
    return uniqueId(data);
  } else return Number(id);
};
