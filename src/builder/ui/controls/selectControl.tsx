import React from "react";
import { type SelectChoice, Select } from "../form/select";

export function SelectControl({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const onSelectChange = (choice: SelectChoice) => {
    onChange(choice.id);
  };

  const selectChoices: SelectChoice[] = options.map((option) => ({
    id: option,
    label: option,
  }));

  const selectedChoice = value
    ? selectChoices.find((c) => c.id === value)
    : undefined;

  return (
    <div className="mb-4">
      <div className="font-bold mb-1">{id}</div>
      <Select
        choices={selectChoices}
        value={selectedChoice}
        onChange={onSelectChange}
      />
    </div>
  );
}