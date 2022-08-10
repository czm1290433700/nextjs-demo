import React, { useState, useEffect, createContext } from "react";
import { Themes } from "@/constants/enum";

interface IThemeContextProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

interface IProps {
  children: JSX.Element;
}

export const ThemeContext = createContext<IThemeContextProps>(
  {} as IThemeContextProps
);

export const ThemeContextProvider = ({ children }: IProps): JSX.Element => {
  // 服务器端注入拿不到客户端缓存，初始化none避免一些色调突变
  const [theme, setTheme] = useState<Themes>(Themes.none);

  // 监听本地缓存来同步不同页面间的主题
  useEffect(() => {
    const checkTheme = (): void => {
      const item = (localStorage.getItem("theme") as Themes) || Themes.light;
      setTheme(item);
      document.getElementsByTagName("html")[0].dataset.theme = item;
    };
    checkTheme();
    // 保证打开多进程页面，某一进程调整主题，剩下的进程页面不需要刷新即可同步主题
    window.addEventListener("storage", checkTheme);
    return (): void => {
      window.removeEventListener("storage", checkTheme);
    };
  }, []);

  useEffect(() => {
    document.getElementsByTagName("html")[0].dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
