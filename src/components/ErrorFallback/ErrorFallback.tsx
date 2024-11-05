import { FallbackProps } from 'react-error-boundary';

import { Alert } from '@/components/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getErrorMessage } from '@/utils/getErrorMessage';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
    navigate('/');
    resetErrorBoundary();
  };

  const errorMessage = getErrorMessage(error);

  return (
    <Alert
      isOpen={isOpen}
      title="에러가 발생했습니다."
      content={errorMessage}
      submitButtonText="홈으로"
      onSubmit={onClose}
    />
  );
};

export default ErrorFallback;
