import axios from 'axios';

export const sendDataToRpi = async (data, key) => {
  const pythonServer = 'http://localhost:9999/api/v1/'
  const payload = {...data, key}
  try {
    const response = await axios({
      method: 'POST',
      url: pythonServer,
      data: payload,
      timeout: 2000
    })
    return response.data.message;
  } catch (e) {
    console.error(e);
    return false;
  };
}