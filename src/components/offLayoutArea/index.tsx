import { LeftOutlined } from "@ant-design/icons";
import { RefineKbar } from "@refinedev/kbar";

import { ToggleContainer } from "./styled";

export const OffLayoutArea = () => {
    return (
        <ToggleContainer>
            <RefineKbar />
            <LeftOutlined />
            <a href="https://en.wikipedia.org/wiki/Dirty_Hungarian_Phrasebook">
                Hi there, Levi here <br />
                <strong>%SYSTEM-F-GAMEOVER</strong>
            </a>
        </ToggleContainer>
    );
};
