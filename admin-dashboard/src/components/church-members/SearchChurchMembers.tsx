import { Label, TextInput } from "flowbite-react";
import { FC } from "react";

const SearchChurchMembers: FC = function () {
	return (
		<form className="mb-4 sm:mb-0 sm:pr-3" method="GET">
			<Label htmlFor="staff-search" className="sr-only">
				Search
			</Label>
			<div className="relative mt-1 lg:w-64 xl:w-96">
				<TextInput
					id="products-search"
					name="products-search"
					placeholder="Search for church members..."
				/>
			</div>
		</form>
	);
};

export default SearchChurchMembers;