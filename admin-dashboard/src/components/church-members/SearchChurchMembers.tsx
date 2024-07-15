import { Label, TextInput } from "flowbite-react";
import { FC } from "react";

interface SearchChurchMembersProps {
  onSearch: (searchTerm: string) => void;
}

const SearchChurchMembers: FC<SearchChurchMembersProps> = function ({ onSearch }) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" onSubmit={(e) => e.preventDefault()}>
      <Label htmlFor="member-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="member-search"
          name="member-search"
          placeholder="Search for church members..."
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};

export default SearchChurchMembers;