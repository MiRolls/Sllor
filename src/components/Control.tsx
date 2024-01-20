import {Box, Flex} from "@radix-ui/themes";
import {ControlData} from "../interfaces/control.ts";


const Control = ({control}: { control: ControlData }) => {
    return (
        <Flex direction="column">
            {control.map((item,index) => {
                return (
                    <Box key={item.toString() + index}>

                    </Box>
                )
            })}
        </Flex>
    );
};

export default Control;