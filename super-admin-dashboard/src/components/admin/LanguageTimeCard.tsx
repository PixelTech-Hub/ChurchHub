import { Button, Card, Label } from "flowbite-react";
import { FC } from "react";
import { Select } from "react-day-picker";

const LanguageTimeCard: FC = function () {
	return (
	  <Card>
		<h3 className="text-xl font-bold dark:text-white">Language &amp; Time</h3>
		<div className="mb-1 grid grid-cols-1 gap-y-2">
		  <Label htmlFor="settings-language">Select language</Label>
		  <Select id="settings-language" name="settings-language">
			<option>English (US)</option>
			<option>Italiano</option>
			<option>Français (France)</option>
			<option>正體字</option>
			<option>Español (España)</option>
			<option>Deutsch</option>
			<option>Português (Brasil)</option>
		  </Select>
		</div>
		<div className="mb-3 grid grid-cols-1 gap-y-2">
		  <Label htmlFor="settings-timezone">Time Zone</Label>
		  <Select id="settings-timezone" name="settings-timezone">
			<option>GMT+0 Greenwich Mean Time (GMT)</option>
			<option>GMT+1 Central European Time (CET)</option>
			<option>GMT+2 Eastern European Time (EET)</option>
			<option>GMT+3 Moscow Time (MSK)</option>
			<option>GMT+5 Pakistan Standard Time (PKT)</option>
			<option>GMT+8 China Standard Time (CST)</option>
			<option>GMT+10 Eastern Australia Standard Time (AEST)</option>
		  </Select>
		</div>
		<div>
		  <Button color="primary">Save all</Button>
		</div>
	  </Card>
	);
  };

  export default LanguageTimeCard