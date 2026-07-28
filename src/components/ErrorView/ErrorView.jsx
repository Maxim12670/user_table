import { Alert } from "antd";

const ErrorView = ({ message }) => {
  return (
    <Alert
      title="Ошибка"
      description={`${message} Попробуйте перезагрузить страницу!
        (Возможно необходимо включить VPN)`}
      type="error"
      showIcon
    />
  );
};

export default ErrorView;
