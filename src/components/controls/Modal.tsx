"use";
import { Color, Size } from "@/utils/types";
import Box from "./Box";
import classNames from "classnames";
import { forwardRef, useImperativeHandle, useRef } from "react";
import useToggle from "@/hooks/useToggle";

type ModalProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  size?: Size;
  color?: Color;
  label: string;
  onClose?: () => void;
  bodyProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
  titleProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
};
export type modalRef = {
  open: boolean;
  openHandler: () => void;
  closeHandler: () => void;
};

const Modal = forwardRef<modalRef, ModalProps>(
  ({ label, onClose, children, className, ...rest }, ref) => {
    const classes = classNames("modal fade show", className);
    const modalRef = useRef<HTMLDivElement>(null);

    const { isOpen, openHandler, closeHandler } = useToggle();

    useImperativeHandle(ref, () => ({
      current: modalRef.current,
      open: isOpen,
      openHandler,
      closeHandler,
    }));

    return isOpen ? (
      <>
        <Box
          style={{
            display: "block",
            paddingRight: "17px",
          }}
          className={classes}
          ref={modalRef}
          {...rest}
        >
          <Box className="modal-dialog modal-dialog-centered">
            <Box className="modal-content">
              <Box className="modal-header">
                <h5 className="modal-title">{label}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    onClose?.();
                    closeHandler();
                  }}
                ></button>
              </Box>
              <Box className="modal-body">{children}</Box>
            </Box>
          </Box>
        </Box>
        <Box className={"modal-backdrop fade show"}></Box>
      </>
    ) : null;
  }
);

export default Modal;
