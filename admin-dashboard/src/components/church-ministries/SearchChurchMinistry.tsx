import { Label, TextInput } from 'flowbite-react';
import React, { FC } from 'react'


interface SearchChurchMinistryProps {
	onSearch: (searchTerm: string) => void;
  }


const SearchChurchMinistry: FC<SearchChurchMinistryProps> = function ({ onSearch }) {
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
	  onSearch(event.target.value);
	};
  
	return (
	  <form className="mb-4 sm:mb-0 sm:pr-3" onSubmit={(e) => e.preventDefault()}>
		<Label htmlFor="ministry-search" className="sr-only">
		  Search
		</Label>
		<div className="relative mt-1 lg:w-64 xl:w-96">
		  <TextInput
			id="ministry-search"
			name="ministry-search"
			placeholder="Search for church ministry..."
			onChange={handleSearch}
		  />
		</div>
	  </form>
  )
}

export default SearchChurchMinistry