import { Box, Button, CircularProgress, styled } from "@mui/material";
import PropTypes from "prop-types";

const CustomButton = styled(Button)(({ theme }) => ({
  root: {
    borderRadius: theme.spacing(1),
  },
}));

export default function NewButton(props) {
  const {
    children,
    type,
    label,
    variant,
    onClick,
    color,
    fullWidth,
    disableElevation,
    startIcon,
    disabled,
    loading,
    ...rest
  } = props;

  return (
    <Box
      style={{
        position: "relative",
        ...props.style,
      }}
    >
      <CustomButton
        disableElevation={disableElevation}
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        onClick={onClick}
        disabled={disabled || loading}
        type={type}
        startIcon={startIcon}
        {...rest}
      >
        {children || label}
      </CustomButton>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -20,
            marginLeft: -12,
          }}
          color="primary"
        />
      )}
    </Box>
  );
}

NewButton.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.array,
  fullWidth: PropTypes.bool,
  disableElevation: PropTypes.bool,
  startIcon: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
NewButton.defaultProps = {
  variant: "contained",
  label: "Um Botão",
  color: "primary",
  fullWidth: false,
  disableElevation: false,
};
