import { useEffect } from "react";
import { ControlState, useControl } from "../../../store/control.ts";
import { HiMenu } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import isPhone from "../../../utils/isPhone.ts";

export async function QuestionnaireLoader() {
	return {};
}

const QuestionnairePage = () => {
	const changeControl = useControl(state => (state as ControlState).changeControl);
	const clear = useControl(state => (state as ControlState).clear);
	const changeShow = useControl(state => (state as ControlState).changeShow);

	useEffect(() => {
		changeControl([
			{
				type: "choice",
				name: "choice",
				action: () => {
					console.log(111);
				},
				icon: <HiMenu />,
			},
			{
				type: "choice",
				name: "choice",
				action: () => {
					console.log(111);
				},
				icon: <IoCreateOutline />,
			},
		]);
		return () => {
			clear();
			if (!isPhone()) {
				// isn't phone
				changeShow(true);
			}
		};
	}, []);

	return <div>111</div>;
};

export default QuestionnairePage;
