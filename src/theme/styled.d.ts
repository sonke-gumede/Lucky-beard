import "styled-components";
import AppTheme from "./index";

type AppThemeProps = typeof AppTheme;

declare module "styled-components" {
  export interface DefaultTheme extends AppThemeProps {}
}
