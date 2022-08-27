import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useContext,
  useMemo,
} from "react";
import styles from "./styles.module.scss";
import ReactDom from "react-dom";
import { UserAgentContext } from "@/stores/userAgent";
import { Environment } from "@/constants/enum";
import cName from "classnames";

export interface IPopupRef {
  open: () => void;
}

interface IProps {
  children: JSX.Element;
}

export const Popup = forwardRef<IPopupRef, IProps>(({ children }, ref) => {
  const [visible, setVisible] = useState(false);
  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);
  const { userAgent } = useContext(UserAgentContext);

  useEffect(() => {
    document.body.className = visible ? "forbidScroll" : "";
    let timeout;
    if (visible) {
      setEnter(true);
      timeout = setTimeout((): void => {
        setEnter(false);
      }, 300);
    } else {
      setLeave(true);
      timeout = setTimeout((): void => {
        setLeave(false);
      }, 300);
    }
    return (): void => {
      timeout = null;
    };
  }, [visible]);

  useImperativeHandle(ref, () => ({
    open: (): void => {
      setEnter(true);
      setVisible(true);
      setTimeout((): void => {
        setEnter(false);
      }, 300);
    },
  }));

  const renderDom = visible ? (
    <div
      className={cName({
        [styles.popup]: true,
        [styles.enter]: enter,
        [styles.leave]: leave,
      })}
    >
      <div className={styles.mask} />
      <div className={styles.popupContent}>
        <div
          className={styles.closeBtn}
          onClick={(): void => {
            setLeave(true);
            setTimeout((): void => {
              setLeave(false);
            }, 300);
            setVisible(false);
          }}
        />
        {children}
      </div>
    </div>
  ) : (
    <></>
  );

  return typeof document !== "undefined"
    ? ReactDom.createPortal(renderDom, document.body)
    : renderDom;
});
