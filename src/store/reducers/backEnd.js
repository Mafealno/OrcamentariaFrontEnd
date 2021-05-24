const ESTADO_INICIAL = {
  link: process.env.REACT_APP_API_URL_DEV,
};

export default function backEnd(state = ESTADO_INICIAL, action) {
  return {
    ...state,
  };
}
