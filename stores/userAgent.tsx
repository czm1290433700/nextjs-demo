import React, { useState, useEffect, createContext } from "react";
import { Environment } from "@/constants/enum";

interface IUserAgentContextProps {
  userAgent: Environment;
}

interface IProps {
  children: JSX.Element;
}

export const UserAgentContext = createContext<IUserAgentContextProps>(
  {} as IUserAgentContextProps
);

export const UserAgentProvider = ({ children }: IProps): JSX.Element => {
  const [userAgent, setUserAgent] = useState<Environment>(Environment.none); // 服务器渲染初始化渲染未必是预期效果，none缓冲切换视觉)

  // 监听本地缓存来同步不同页面间的主题（当前页面无法监听到，直接在顶部栏进行了类的切换)
  useEffect(() => {
    const checkUserAgent = (): void => {
      const width = document.body.offsetWidth;
      // 用宽度去判断，是为了适配不改机型，仅拉扯屏幕宽度的情况
      if (width < 768) {
        // 手机端
        setUserAgent(Environment.mobile);
      } else if (width >= 768 && width < 1200) {
        // ipad端
        setUserAgent(Environment.ipad);
      } else if (width >= 1200) {
        // pc端
        setUserAgent(Environment.pc);
      } else {
        setUserAgent(Environment.none); // 增加none类型来缓冲默认类型样式切换时的视觉突变
      }
    };
    checkUserAgent();
    window.addEventListener("resize", checkUserAgent); // 监听屏幕宽度变化，及时适配当前页面样式
    return (): void => {
      window.removeEventListener("resize", checkUserAgent);
    };
  }, [typeof document !== "undefined" && document.body.offsetWidth]);

  return (
    <UserAgentContext.Provider value={{ userAgent }}>
      {children}
    </UserAgentContext.Provider>
  );
};
