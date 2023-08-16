const ErrorMessage: React.FC<{ errMessage: string }> = ({ errMessage }) => {
  return (
    <span role="alert" className="error__message">
      {errMessage}
    </span>
  );
};

export default ErrorMessage;
