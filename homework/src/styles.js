export const colors = {
  background: "#D2FDFF",
  messageOwnBg: "#B4DEF5",
  messageOtherBg: "#FBE8A6",
  buttonBg: "#F4976C",
  buttonText: "#330033",
  headerText: "#330033",
  nicknameText: "#330033",
  messageText: "#000000",
  errorText: "red",
  loaderSpinner: "#4A90E2",
};

export const fonts = {
  header: `"Roboto Serif", serif`,
  nickname: `"Roboto", sans-serif`,
  message: `"Roboto", sans-serif`,
};

export const common = {
  borderRadius: 8,
  itemHeight: 70,
};

export const container = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: 10,
  boxSizing: "border-box",
  backgroundColor: colors.background,
  overflowY: "auto",
};

export const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 0,
  marginBottom: 20,
  backgroundColor: "#B4DEF5",
  padding: "5px",
  borderRadius: common.borderRadius,
};

export const headerWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#B4DEF5",
  padding: "10px 20px",
  borderRadius: common.borderRadius,
  boxSizing: "border-box",
};

export const title = {
  fontSize: 24,
  fontFamily: fonts.header,
  fontWeight: 600,
  color: colors.headerText,
  textAlign: "center",
};

export const inputContainer = {
  width: "100%",
  maxWidth: 400,
  marginBottom: 20,
};

export const input = {
  width: "100%",
  padding: "12px",
  fontSize: 16,
  borderRadius: common.borderRadius,
  border: "1px solid #ccc",
  backgroundColor: "#B4DEF5",
  fontFamily: fonts.message,
  color: colors.buttonText,
  fontWeight: "400",
  boxSizing: "border-box",
};

export const buttonBase = {
  padding: "12px 20px",
  fontSize: 16,
  cursor: "pointer",
  borderRadius: common.borderRadius,
  border: "none",
  backgroundColor: colors.buttonBg,
  color: colors.buttonText,
  fontFamily: fonts.nickname,
  fontWeight: 600,
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
};

export const sendButtonHover = {
  backgroundColor: "#ff5c1bff",
  boxShadow: "0 6px 12px rgba(0,0,0,0.28)",
};

export const messageListContainer = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  borderRadius: common.borderRadius,
  padding: 5,
  backgroundColor: "#fafafa",
  boxSizing: "border-box",
  overflowY: "auto",
};

export const inputForm = {
  marginTop: 10,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: 50,
  flexShrink: 0,
};

const baseMessageStyle = {
  padding: "10px",
  margin: "5px",
  borderRadius: common.borderRadius,
  maxWidth: "70%",
  wordBreak: "break-word",
  fontFamily: fonts.message,
  fontSize: 14,
  fontWeight: "400",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
};

export const estimateMessageHeight = (body) => {
  const lineHeight = 17; // Высота строки
  const minHeight = common.itemHeight; // Минимальная высота
  const lines = Math.max(body.length / 85); // Оценка количества строк
  const guaranteedHeight = lines * lineHeight + 70; // Высота текста
  return Math.max(minHeight, guaranteedHeight); // Возврат высоты
};

// Контейнер для сообщений
export const createMessageStyles = (isOwn, messageBody) => {
  const height = estimateMessageHeight(messageBody);
  return {
    ...baseMessageStyle,
    backgroundColor: isOwn ? colors.messageOwnBg : colors.messageOtherBg,
    color: colors.messageText,
  };
};

export const messageOwn = {
  ...baseMessageStyle,
  backgroundColor: colors.messageOwnBg,
  color: colors.messageText,
  alignSelf: "center",
};

export const messageOther = {
  ...baseMessageStyle,
  backgroundColor: colors.messageOtherBg,
  color: colors.messageText,
  alignSelf: "center",
};

export const nicknameStyle = {
  display: "block",
  marginBottom: 4,
  fontWeight: 600,
  fontFamily: fonts.nickname,
  fontSize: 14,
  color: colors.nicknameText,
};

export const errorText = {
  color: colors.errorText,
  margin: "10px 0 0 0",
  fontSize: 14,
  maxWidth: 400,
};

export const successMessage = {
  color: "lightgreen",
  marginTop: "1rem",
  fontSize: 14,
  textAlign: "center",
};

export const buttonText = {
  fontSize: 18,
  fontWeight: 600,
  fontFamily: fonts.nickname,
  color: colors.buttonText,
  cursor: "default",
  marginBottom: 5,
  textAlign: "center",
};

export const linkButtonText = {
  fontSize: 16,
  fontWeight: 400,
  fontFamily: fonts.nickname,
  color: colors.buttonText,
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  textDecoration: "none",
  padding: 0,
  textAlign: "center",
  transition: "text-decoration 0.3s",
};

export const formStyle = {
  backgroundColor: "rgba(251, 232, 166, 0.5)",
  padding: "20px",
  borderRadius: common.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 20,
};
