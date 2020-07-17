const ESTADO_INICIAL = {
  link: "http://localhost:5000/api",
};

export default function backEnd(state = ESTADO_INICIAL, action) {
  return {
    ...state,
  };
}
