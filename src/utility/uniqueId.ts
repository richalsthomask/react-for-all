export const uniqueId = (data: { id: number }[]) => {
  let id = Math.random() * 100000;
  while (data?.find((ele) => ele.id === id)) {
    id = Math.random() * 100000;
  }
  return Number(id);
};
