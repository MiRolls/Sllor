import {Box, Flex} from "@radix-ui/themes";
import {ControlData} from "../interfaces/control.ts";


const Control = ({control}: { control: ControlData }) => {
    return (
        <Flex direction="column" className={control ? "flex fixed" : "hidden fixed"}>
            {control.map((item, index) => {
                return (
                    <Box key={item.toString() + index}>
                        1
                    </Box>
                )
            })}
        </Flex>
    );
};

export default Control;