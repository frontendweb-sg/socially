"use client";
import classNames from "classnames";
import Box from "./Box";
import { useAppState } from "../providers/AppProvider";
import Button from "./Button";
import { AppContent } from "@/utils/content";

type ConfirmModalProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
const ConfirmModal = ({ children, className, ...rest }: ConfirmModalProps) => {
  const { onCancelConfirm, state } = useAppState();
  const { confirm } = state;
  const classes = classNames("modal fade show", className);

  return confirm.open ? (
    <>
      <Box
        className={classes}
        {...rest}
        style={{
          display: "block",
          paddingRight: "17px",
        }}
      >
        <Box className="modal-dialog modal-dialog-centered">
          <Box className="modal-content">
            <Box className="modal-header">
              <h5 className="modal-title">{confirm.label}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onCancelConfirm}
              ></button>
            </Box>
            <Box className="modal-body">
              {confirm.content} {children}
            </Box>
            <Box className="modal-footer">
              <Button onClick={onCancelConfirm}>{AppContent.cancel}</Button>
              <Button onClick={confirm.onSubmit}>{AppContent.ok}</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={"modal-backdrop fade show"}></Box>
    </>
  ) : null;
};

export default ConfirmModal;
