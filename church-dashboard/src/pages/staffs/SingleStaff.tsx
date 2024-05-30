
import { useParams } from 'react-router-dom'

const SingleStaff = () => {
	const { id } = useParams()
	return (
		<div>SingleStaff {id}</div>
	)
}

export default SingleStaff