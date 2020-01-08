const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fakeAxios = async () => {
  await sleep(1000);
  return {
      stuff: 'this is the report contents'
  }
};
