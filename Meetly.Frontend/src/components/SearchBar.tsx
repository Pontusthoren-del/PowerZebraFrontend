import "./styles/SearchBar.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <label htmlFor="search" className="search-label">
        Sök meetup
      </label>
      <input id="search" type="search" className="search-input" placeholder="T.ex. React eller Varberg" value={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}