const ErrorMessage: React.FC<{ errMessage: string }> = ({ errMessage }) => {
  return <span className="error__message">{errMessage}</span>;
};

export default ErrorMessage;
