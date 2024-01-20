import {useEffect} from "react";
import {ControlState, useControl} from "../../store/control.ts";
import {HiMenu} from "react-icons/hi";
import {IoCreateOutline} from "react-icons/io5";

export async function QuestionnaireLoader(){
    return {}
}

export const QuestionnairePage = () => {
    const changeControl = useControl(state => (state as ControlState).changeControl)

    useEffect(() => {
        changeControl([
            {
                type: "choice",
                name: "choice",
                action: ()=> { console.log(111)},
                icon: <HiMenu />
            },
            {
                type: "choice",
                name: "choice",
                action: ()=> { console.log(111)},
                icon: <IoCreateOutline />
            }
        ])
        return () => {
            changeControl([])
        }
    }, []);

    return (
        <div>

        </div>
    );
};

export default QuestionnairePage;
