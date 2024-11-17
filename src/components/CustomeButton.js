import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = ({
  onClick,
  text,
  gradient = 'linear-gradient(45deg, #5e72e4, #825ee4)',
  Tcolor = '#fff',
  Icolor = '#fff',
  icon: Icon,
  ...props
}) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
  }));

  return (
    <StyledButton
      onClick={onClick}
      sx={{
        background: gradient,
        color: Tcolor,
        '&:hover': {
          background: gradient,
          opacity: 0.9,
        },
      }}
      variant="contained"
      fullWidth
      startIcon={Icon ? <Icon sx={{ color: Icolor }} /> : null}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default CustomButton;
