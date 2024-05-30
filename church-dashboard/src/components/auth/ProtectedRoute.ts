import { useAppDispatch } from "@/app/hooks";
import { useNavigation } from "react-router-dom"


const ProtectedRoute = ({ children }) => {
	const navigate = useNavigation();
	const dispatch = useAppDispatch()
	
	

}