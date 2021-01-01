import React from "react";
import { Button, Message } from "semantic-ui-react";

interface ErrorMessageProps {
  title: string;
  message?: string;
  retryText?: string;
  onRetry?: () => void;
}

function ErrorMessage({
  title,
  message,
  retryText = "Retry",
  onRetry,
}: ErrorMessageProps) {
  return (
    <Message negative>
      <Message.Header>{title}</Message.Header>
      <p>{message}</p>
      <Button negative onClick={onRetry}>
        {retryText}
      </Button>
    </Message>
  );
}

export default ErrorMessage;
