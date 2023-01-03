import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import restartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";

const App = () => {
  const resetAndCreateGrid = () => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="" width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00"></InfoItem>
          <InfoItem label="Movimentos" value="0"></InfoItem>
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        ></Button>
      </C.Info>

      <C.GridArea>...</C.GridArea>
    </C.Container>
  );
};

export default App;
