import {
  useState,
  createContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import Box from "../Box";
import Tab from "./Tab";

/**
 * Tabs
 * @returns
 */

type contextProps = {
  activeColor?: Color | string;
  active: number;
  onChangeTab?: (index: number) => void;
};

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  tabs: string[];
  activeColor?: Color | string;
};

export const TabContext = createContext<contextProps>({
  active: 0,
  onChangeTab: () => {},
  activeColor: "secondary",
});

type tabsRef = contextProps;
const Tabs = forwardRef<tabsRef, Props>(
  ({ activeColor, tabs, children }, ref) => {
    const [active, setActive] = useState<number>(0);

    const onChangeTab = (index: number) => {
      setActive(index);
    };

    useImperativeHandle(ref, () => ({
      active,
      onChangeTab,
    }));

    return (
      <TabContext.Provider value={{ active, onChangeTab }}>
        <Box className="tabs">
          <Box className="tabs-item">
            {tabs.map((tab: string, index: number) => {
              return (
                <Tab
                  color={active === index ? "secondary" : "primary"}
                  onClick={() => onChangeTab(index)}
                  key={tab}
                >
                  {tab}
                </Tab>
              );
            })}
          </Box>
          <Box className="tabs-container">{children}</Box>
        </Box>
      </TabContext.Provider>
    );
  }
);

export default Tabs;
